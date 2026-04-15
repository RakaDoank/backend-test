import {
	ApiReference,
} from "@scalar/nextjs-api-reference"

export const GET = ApiReference({

	url: "http://localhost:4000/.well-known/openapi.json",

	theme: "deepSpace",

})
