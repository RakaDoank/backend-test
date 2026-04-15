// Simple Fastify Testing
// See https://fastify.dev/docs/latest/Guides/Testing/

import {
	test,
} from "node:test"

import {
	App,
} from "../App"

test("Test request DELETE \"/api/news/12345678\" Route", async (t: test.TestContext) => {
	const app = await App()

	const response = await app.inject({
		method: "DELETE",
		url: "/api/news/12345678", // delete an unknown news is not an error and produces 204 response
	})

	t.assert.ok(
		response.statusCode >= 200 && response.statusCode < 300,
		"Status code of success response should've between 200 and 299 range",
	)
})
