import type {
	FastifyPluginCallback,
} from "fastify"

import {
	delete_,
} from "./delete"

import {
	put,
} from "./put"

export const Route: FastifyPluginCallback = (fastify, opt, done) => {
	delete_(fastify)
	put(fastify)
	done()
}
