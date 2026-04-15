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

import {
	Tags,
} from "../_tags"

import {
	ParamsJsonSchema,
} from "./_params-json-schema"

/**
 * `delete` is reserved word
 */
export function delete_(
	fastify: FastifyInstance,
) {
	fastify.delete<{
		Params: Type.Static<typeof ParamsJsonSchema>,
	}>(
		"/",
		{
			schema: {
				summary: "Delete a Topic data",
				description: "Remove a Topic data.",
				tags: Tags,
				params: ParamsJsonSchema,
				response: responseJsonSchema,
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			await orm
				.delete(Schema.NewsTopic)
				.where(
					drizzleOrm.eq(Schema.NewsTopic.topic_id, req.params.id),
				)

			await orm
				.delete(Schema.Topic)
				.where(
					drizzleOrm.eq(Schema.Topic.id, req.params.id),
				)

			reply.status(204).send()
		},
	)
}

const
	responseJsonSchema =
		{
			204: Type.Null({
				description: "A topic has been deleted succesfully",
			}),
			400: RouteModule
				.GenericJsonSchema
				.ErrorResponse,
		}
