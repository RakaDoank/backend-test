import node_path from "node:path"

import Fastify, {
	type FastifyError,
} from "fastify"

import * as DrizzleOrm from "drizzle-orm"

import * as Registerer from "./registerer"

import * as Routes from "./routes"

import type {
	ResponseType,
} from "./types"

const fastify = Fastify({
	logger: true,
})

export async function App() {

	// env
	await Registerer.env(
		fastify,
		node_path.join(process.cwd(), ".env"),
	)

	// cors
	await Registerer.cors(fastify)

	// set postgres connection
	await Registerer.postgres(fastify)

	// swagger
	await Registerer.swagger(fastify)

	// +++++ Routes +++++

	fastify.register(
		Routes.Api.News.Route,
		{
			prefix: "/api/news",
		},
	)
	fastify.register(
		Routes.Api.Topic.Route,
		{
			prefix: "/api/topic",
		},
	)

	fastify.setErrorHandler((error, request, reply) => {
		console.log("Fastify Error :: ", error)
		// this console should not be in production
		// it's only for debugging

		if(error instanceof DrizzleOrm.DrizzleQueryError) {
			reply
				.status(500)
				.send({
					data: null,
					error: {
						code: "E00",
						message: "Something went wrong. Please contact administrator",
					},
				} satisfies ResponseType.GenericJson)
			return
		}

		const err = error as FastifyError

		// Make the JSON structure consistent upon success and error
		reply
			.status(err.statusCode || 500)
			.send({
				data: null,
				error: {
					// It's better to use our own custom code from Fastify error codes
					code: err.code,
					message: err.message || "Unknown error",
				},
			} satisfies ResponseType.GenericJson)
	})

	// Use homepage as Scalar API Reference page
	await Registerer.scalarApiReference(fastify)

	// ----- Routes -----

	// User can access this OpenAPI file
	// This is required for Scalar API reference web from the `@apps/scalar-api-docs`.
	fastify.get("/.well-known/openapi.json", () => {
		return fastify.swagger()
	})

	await fastify.ready()

	return fastify

}
