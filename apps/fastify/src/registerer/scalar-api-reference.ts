import type {
	FastifyInstance,
} from "fastify"

import ScalarFastifyApiReference from "@scalar/fastify-api-reference"

export async function scalarApiReference(fastify: FastifyInstance) {
	await fastify.register(
		ScalarFastifyApiReference,
		{
			routePrefix: "/",
			configuration: {
				theme: "deepSpace",
			},
			hooks: {
				onRequest(req, reply, done) {
					done()
				},
				preHandler(req, reply, done) {
					done()
				},
			},
		},
	)
}
