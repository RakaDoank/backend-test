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
				summary: "Get Topic List",
				description: "Retrieve topic list data.",
				tags: Tags,
				querystring: querystringJsonSchema,
				response: {
					200: RouteModule
						.GenericJsonSchema
						.createDataResponse([drizzleTypebox.createSelectSchema(Schema.Topic)]),
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
				.select()
				.from(Schema.Topic)
				.orderBy(
					drizzleOrm.desc(Schema.Topic.created_at),
				)
				.limit(req.query.limit)
				.offset(req.query.offset)

			reply.send({
				data,
				error: null,
			} satisfies ResponseType.GenericJson)
		},
	)
}

const
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
		})
