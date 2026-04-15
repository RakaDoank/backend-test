import type {
	FastifyInstance,
} from "fastify"

import * as drizzleOrm from "drizzle-orm"
import * as drizzlePg from "drizzle-orm/node-postgres"
import * as drizzleTypebox from "drizzle-typebox"

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

export function get(
	fastify: FastifyInstance,
) {
	fastify.get<{
		Querystring: Type.Static<typeof querystringJsonSchema>,
	}>(
		"/",
		{
			schema: {
				summary: "Get News List",
				description: "Retrieve news list data.",
				tags: Tags,
				querystring: querystringJsonSchema,
				response: {

					// Can't use this
					// No utilities (or I just don't know how)
					// to join additional prop in a object schema with Typebox
					// I've tried `Type.Intersect`.
					// 200: RouteModule
					// 	.GenericJsonSchema
					// 	.createDataResponse([drizzleTypebox.createSelectSchema(Schema.News)]),

					200: RouteModule
						.GenericJsonSchema
						.createDataResponse(responseJsonSchemaDataType),
					400: RouteModule
						.GenericJsonSchema
						.ErrorResponse,

				},
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			const data = await orm
				.select({
					id: Schema.News.id,
					title: Schema.News.title,
					content: Schema.News.content,
					status: Schema.News.status,
					created_at: Schema.News.created_at,
					updated_at: Schema.News.updated_at,

					// Thank you Gemini
					topics: drizzleOrm.sql<{
						id: typeof Schema.Topic.$inferSelect.id,
						name: typeof Schema.Topic.$inferSelect.name,
						created_at: typeof Schema.Topic.$inferSelect.created_at,
						updated_at: typeof Schema.Topic.$inferSelect.updated_at,
					}[]>`
						COALESCE(
							JSONB_AGG(
								JSONB_BUILD_OBJECT(
									'id', ${Schema.Topic.id},
									'name', ${Schema.Topic.name},
									'created_at', ${Schema.Topic.created_at},
									'updated_at', ${Schema.Topic.updated_at}
								)
							) FILTER (WHERE ${Schema.Topic.id} IS NOT NULL),
							'[]'::jsonb
						)
					`.as("topics"),
				})
				.from(Schema.News)
				.leftJoin(
					Schema.NewsTopic,
					drizzleOrm.eq(Schema.NewsTopic.news_id, Schema.News.id),
				)
				.leftJoin(
					Schema.Topic,
					drizzleOrm.eq(Schema.Topic.id, Schema.NewsTopic.topic_id),
				)
				.where(
					drizzleOrm.and(
						req.query.status
							? drizzleOrm.eq(Schema.News.status, req.query.status)
							: undefined,

						req.query.topic_id
							? drizzleOrm.eq(Schema.NewsTopic.topic_id, req.query.topic_id)
							: undefined,
					),
				)
				.groupBy(
					Schema.News.id,
				)
				.limit(req.query.limit)
				.offset(req.query.offset)

			reply.send({
				data: data.map(item => {
					return {
						id: item.id,
						title: item.title,
						content: item.content,
						status: item.status,
						created_at: item.created_at,
						updated_at: item.updated_at,
						topics: item.topics,
					}
				}) satisfies Type.Static<typeof responseJsonSchemaDataType>,
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

	querystringJsonSchema =
		Type.Object({
			offset: Type.Number({
				default: 0,
				minimum: 0,
			}),
			limit: Type.Number({
				default: 20,
				minimum: 0,
				maximum: 100,
			}),
			topic_id: Type.Optional(Type.Number({
				minimum: 0,
			})),
			status: Type.Optional(dataStatusJsonSchema),
		}),

	responseJsonSchemaDataType =
		Type.Array(
			Type.Object({
				id: Type.Number(),
				title: Type.String(),
				content: Type.String(),
				status: dataStatusJsonSchema,
				topics: Type.Union([
					Type.Array(drizzleTypebox.createSelectSchema(Schema.Topic)),
					Type.Null(),
				]),
				created_at: Type.Union([Type.String(), Type.Null()]),
				updated_at: Type.Union([Type.String(), Type.Null()]),
			}),
		)
