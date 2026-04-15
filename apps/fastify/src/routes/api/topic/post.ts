import type {
	FastifyInstance,
} from "fastify"

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

export function post(
	fastify: FastifyInstance,
) {
	fastify.post<{
		Body: Type.Static<typeof bodyJsonSchema>,
	}>(
		"/",
		{
			schema: {
				summary: "Insert a Topic data",
				description: "Insert a Topic data.",
				tags: Tags,
				body: bodyJsonSchema,
				response: {
					200: RouteModule.GenericJsonSchema.createDataResponse(
						drizzleTypebox.createInsertSchema(Schema.Topic),
					),
					400: RouteModule.GenericJsonSchema.ErrorResponse,
				},
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			const insertedTopic = await orm
				.insert(Schema.Topic)
				.values({
					name: req.body.name,
				})
				.returning()

			reply
				.send({
					data: insertedTopic[0],
					error: null,
				} satisfies ResponseType.GenericJson)
		},
	)
}

const
	bodyJsonSchema =
		Type.Object({
			name: Type.String(),
		})
