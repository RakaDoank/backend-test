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
} from "../_tags"

import {
	ParamsJsonSchema,
} from "./_params-json-schema"

export function put(
	fastify: FastifyInstance,
) {
	fastify.put<{
		Body: Type.Static<typeof bodyJsonSchema>,
		Params: Type.Static<typeof ParamsJsonSchema>,
	}>(
		"/",
		{
			schema: {
				body: bodyJsonSchema,
				summary: "Update a Topic data",
				description: "Update the Topic name.",
				tags: Tags,
				response: responseJsonSchema,
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			const updatedData = await orm
				.update(Schema.Topic)
				.set({
					name: req.body.name,
					updated_at: new Date().toISOString(),
				})
				.where(
					drizzleOrm.eq(Schema.Topic.id, req.params.id),
				)
				.returning()

			if(updatedData[0]) {
				reply.send({
					data: updatedData[0],
					error: null,
				} satisfies ResponseType.GenericJson)
			} else {
				reply
					.status(404)
					.send(RouteModule.GenericJsonReply.NotFound)
			}
		},
	)
}

const
	bodyJsonSchema =
		Type.Object({
			name: Type.String(),
		}),

	responseJsonSchema =
		{
			200: RouteModule
				.GenericJsonSchema
				.createDataResponse(
					drizzleTypebox.createUpdateSchema(Schema.Topic),
				),
			400: RouteModule
				.GenericJsonSchema
				.ErrorResponse,
			404: RouteModule
				.GenericJsonSchema
				.NotFoundResponse,
		}
