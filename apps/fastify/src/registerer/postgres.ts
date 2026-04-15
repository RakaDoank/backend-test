import type {
	FastifyInstance,
} from "fastify"

import FastifyPostgres from "@fastify/postgres"

export async function postgres(fastify: FastifyInstance) {
	await fastify.register(
		FastifyPostgres,
		{
			host: fastify.config.DATABASE_HOST,
			database: fastify.config.DATABASE_NAME,
			user: fastify.config.DATABASE_USER,
			password: fastify.config.DATABASE_PASSWORD,
			port: Number(fastify.config.DATABASE_PORT),
		},
	)
}
