import type {
	NextConfig,
} from "next"

export default {

	output: "standalone",

	sassOptions: {
		implementation: "sass-embedded",
	},

} satisfies NextConfig
