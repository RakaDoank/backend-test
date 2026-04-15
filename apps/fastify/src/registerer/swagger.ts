import type {
	FastifyInstance,
} from "fastify"

import FastifySwagger from "@fastify/swagger"

export async function swagger(fastify: FastifyInstance) {
	await fastify.register(
		FastifySwagger,
		{
			openapi: {
				info: {
					title: "Fastify App",
					version: "1.0.0",
					description: "Technical Test",
				},
			},
		},
	)
}
