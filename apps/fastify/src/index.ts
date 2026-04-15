import {
	App,
} from "./App"

async function main() {

	const app = await App()

	app.listen(
		{
			port: app.config.FASTIFY_PORT
				? Number(app.config.FASTIFY_PORT)
				: 4000, // fallback
		},
		(err, address) => {
			if(err) {
				app.log.error(err)
				process.exit(1)
			}
			console.log(`Server is running on ${address}`)
		},
	)

}

main()
