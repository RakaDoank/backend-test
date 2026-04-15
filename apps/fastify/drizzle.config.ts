import * as dotenv from "dotenv"

import {
	defineConfig,
} from "drizzle-kit"

dotenv.config()

export default defineConfig({
	dialect: "postgresql",
	schema: [
		"./src/schema/index.ts",
	],
	out: "./database",
	dbCredentials: {
		url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
	},
})
