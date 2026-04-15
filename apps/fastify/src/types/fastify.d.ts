import "fastify"

declare module "fastify" {
	interface FastifyInstance {
		config: {
			DATABASE_HOST: string,
			DATABASE_PORT: string,
			DATABASE_NAME: string,
			DATABASE_USER: string,
			DATABASE_PASSWORD: string,

			FASTIFY_PORT: string,
		},
	}
}
