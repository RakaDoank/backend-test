import type {
	FastifyInstance,
} from "fastify"

import FastifyEnv from "@fastify/env"

import {
	Type,
} from "typebox"

export async function env(
	fastify: FastifyInstance,
	dotenvPath: string,
) {
	await fastify.register(
		FastifyEnv,
		{
			schema: Type.Object({
				DATABASE_HOST: Type.String(),
				DATABASE_PORT: Type.String(),
				DATABASE_NAME: Type.String(),
				DATABASE_USER: Type.String(),
				DATABASE_PASSWORD: Type.String(),
				FASTIFY_PORT: Type.String(),
			}),
			dotenv: {
				path: dotenvPath,
			},
		},
	)
}
