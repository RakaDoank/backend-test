import type {
	FastifyInstance,
} from "fastify"

import FastifyCors from "@fastify/cors"

export async function cors(
	fastify: FastifyInstance,
) {
	await fastify.register(
		FastifyCors,
		{
			// This is only for the sake of technical test.
			// Better to whitelist known origins.
			origin: "*",
		},
	)
}
