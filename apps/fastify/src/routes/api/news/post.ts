import type {
	FastifyInstance,
} from "fastify"

import * as drizzleOrm from "drizzle-orm"
import * as drizzlePg from "drizzle-orm/node-postgres"

import {
	Type,
} from "typebox"

import {
	RouteModule,
} from "@/modules"

import * as Schema from "@/schema"

import type {
	ResponseType,
} from "@/types"

import {
	Tags,
} from "./_tags"

export function post(
	fastify: FastifyInstance,
) {
	fastify.post<{
		Body: Type.Static<typeof bodyJsonSchema>,
	}>(
		"/",
		{
			schema: {
				summary: "Insert a News data",
				description: "Insert a News data.",
				tags: Tags,
				body: bodyJsonSchema,
				response: responseJsonSchema,
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			const insertedNews = await orm
				.insert(Schema.News)
				.values({
					title: req.body.title,
					content: req.body.content,
					status: req.body.status,
				})
				.returning()

			if(!insertedNews[0]?.id) {
				throw new Error("Internal Error")
			}

			const news = insertedNews[0]

			const insertedNewsTopic =
				req.body.topic_ids?.length
					? await orm
						.insert(Schema.NewsTopic)
						.values(
							req.body.topic_ids.map(topicId => {
								return {
									news_id: news.id,
									topic_id: topicId,
								}
							}) satisfies {
								news_id: typeof Schema.NewsTopic.$inferInsert.news_id,
								topic_id: typeof Schema.NewsTopic.$inferInsert.topic_id,
							}[],
						)
						.returning()
						.catch((err) => {
							if(err instanceof drizzleOrm.DrizzleQueryError) {
								// Invalid topic_id
								return null
							}
							throw err
						})
					: await Promise.resolve(null)

			reply
				.send({
					data: {
						id: news.id,
						title: news.title,
						content: news.content,
						status: news.status,
						topic_ids: insertedNewsTopic?.map(nt => nt.topic_id),
					} satisfies Type.Static<typeof responseJsonSchemaDataType>,
					error: null,
				} satisfies ResponseType.GenericJson)
		},
	)
}

const
	dataStatusJsonSchema =
		Type.Enum([
			"published",
			"draft",
			"deleted",
		]),

	bodyJsonSchema =
		Type.Object({
			title: Type.String(),
			content: Type.String(),
			status: dataStatusJsonSchema,
			// The Technical Test constraint was not really telling me explicitly
			// Should a news be associated to topics?
			// At this moment, it's optional
			topic_ids: Type.Optional(
				Type.Array(Type.Number()),
			),
		}),

	responseJsonSchemaDataType =
		Type.Object({
			id: Type.Number(),
			content: Type.String(),
			title: Type.String(),
			status: dataStatusJsonSchema,
			topic_ids: Type.Optional(
				Type.Array(Type.Number()),
			),
		}),

	responseJsonSchema =
		{
			200: RouteModule.GenericJsonSchema.createDataResponse(responseJsonSchemaDataType),
			400: RouteModule.GenericJsonSchema.ErrorResponse,
		}
