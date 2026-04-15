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
				summary: "Delete a News data",
				description: "Important! This is an hard delete action. You may want to update the status to `deleted` instead.",
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
					drizzleOrm.eq(Schema.NewsTopic.news_id, req.params.id),
				)

			await orm
				.delete(Schema.News)
				.where(
					drizzleOrm.eq(Schema.News.id, req.params.id),
				)

			reply.status(204).send()
		},
	)
}

const
	responseJsonSchema =
		{
			204: Type.Null({
				description: "A news has been deleted succesfully",
			}),
			400: RouteModule
				.GenericJsonSchema
				.ErrorResponse,
		}
