#!/usr/bin/env node

import node_fs from "node:fs"
import node_path from "node:path"

import Fastify from "fastify"

import * as argparse from "argparse"

import * as Registerer from "../registerer"

import * as Routes from "../routes"

const argumentParser = new argparse.ArgumentParser()
argumentParser.add_argument(
	"--out-dir",
	{
		help: "Target directory. Default to your current working directory.",
	},
)
argumentParser.add_argument(
	"--yaml",
	{
		nargs: "?",
		const: "true",
		help: "Use yaml version",
	},
)
const args = argumentParser.parse_args() as unknown as {
	out_dir: string,
	yaml: string,
}

const fastify = Fastify({
	logger: true,
})

async function app() {
	await Registerer.swagger(fastify)

	fastify.register(
		Routes.Api.News.Route,
		{
			prefix: "/api/news",
		},
	)

	await fastify.ready()

	const
		dirPath =
			node_path.join(
				process.cwd(),
				args.out_dir || ".",
			),

		isYaml =
			!!args.yaml,

		openApi =
			isYaml
				? fastify.swagger({ yaml: true })
				: JSON.stringify(fastify.swagger(), null, 2)

	node_fs.writeFileSync(
		node_path.join(
			dirPath,
			isYaml ? "openapi.yaml" : "openapi.json",
		),
		openApi,
		"utf8",
	)
}

app()
