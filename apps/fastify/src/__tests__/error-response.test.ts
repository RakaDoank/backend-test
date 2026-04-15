// Simple Fastify Testing
// See https://fastify.dev/docs/latest/Guides/Testing/

import {
	test,
} from "node:test"

import type {
	ResponseType,
} from "@/types"

import {
	App,
} from "../App"

test("Test request PUT \"/api/news/9999999\" Route", async (t: test.TestContext) => {
	const app = await App()

	const response = await app.inject({
		method: "PUT",
		body: {
			title: "Test News",
		},
		url: "/api/news/9999999", // the endpoint should thrown an error response
	})

	const json: ResponseType.GenericJson = await response.json()

	t.assert.ok(
		response.statusCode >= 400,
		"Status code is not an client or server error",
	)
	t.assert.ok(
		!!json.error?.code,
		"Error has no code and message string",
	)
})
