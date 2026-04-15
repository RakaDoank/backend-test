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
				summary: "Update a News data",
				description: "Update a News data, either its title or content.",
				tags: Tags,
				response: responseJsonSchema,
			},
		},
		async (req, reply) => {
			const orm = drizzlePg.drizzle({
				client: fastify.pg.pool,
			})

			const updatedData = await orm
				.update(Schema.News)
				.set({
					title: req.body.title,
					content: req.body.content,
					status: req.body.status,
					updated_at: new Date().toISOString(),
				})
				.where(
					drizzleOrm.eq(Schema.News.id, req.params.id),
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
	dataStatusJsonSchema =
		Type.Enum([
			"published",
			"draft",
			"deleted",
		]),

	bodyJsonSchema =
		Type.Intersect([
			Type.Partial(
				Type.Object({
					title: Type.String(),
					content: Type.String(),
					status: dataStatusJsonSchema,
				}),
			),
			Type.Union([
				Type.Object({ title: Type.String() }),
				Type.Object({ content: Type.String() }),
				Type.Object({ status: dataStatusJsonSchema }),
			]),
		]),

	responseJsonSchema =
		{
			200: RouteModule
				.GenericJsonSchema
				.createDataResponse(
					drizzleTypebox.createUpdateSchema(Schema.News),
				),
			400: RouteModule
				.GenericJsonSchema
				.ErrorResponse,
			404: RouteModule
				.GenericJsonSchema
				.NotFoundResponse,
		}
