import node_fs from "node:fs"
import node_path from "node:path"

import * as esbuild from "esbuild"

const
	fastifyRoot =
		node_path.join(import.meta.dirname, ".."),

	outDir =
		node_path.join(fastifyRoot, ".fastify")

if(node_fs.existsSync(outDir)) {
	node_fs.rmSync(outDir, { recursive: true, force: true })
}

await esbuild.build({
	bundle: true,
	entryPoints: [
		node_path.join(fastifyRoot, "src", "index.ts"),
		node_path.join(fastifyRoot, "src", "__tests__", "*.test.ts"),
		node_path.join(fastifyRoot, "src", "scripts", "generate-openapi.ts"),
	],
	external: [
		"@scalar/*",
		"@fastify/*",
		"argparse",
		"fastify",
		"drizzle-orm",
		"drizzle-orm/*",
		"drizzle-typebox",
		"typebox",
	],
	format: "cjs",
	outdir: outDir,
	platform: "node",
	tsconfig: node_path.join(fastifyRoot, "tsconfig.json"),
})

console.log("Yeay! @apps/fastify has been transpiled.")
