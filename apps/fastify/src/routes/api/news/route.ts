import type {
	FastifyPluginCallback,
} from "fastify"

import {
	Route as Route_ID,
} from "./[id]"

import {
	get,
} from "./get"

import {
	post,
} from "./post"

export const Route: FastifyPluginCallback = (fastify, opt, done) => {
	fastify.register(
		Route_ID,
		{
			prefix: "/:id",
		},
	)
	get(fastify)
	post(fastify)
	done()
}
