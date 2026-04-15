import type {
	Metadata,
} from "next"

import {
	Inter,
} from "next/font/google"

export const metadata: Metadata = {
	title: "Scala API Docs",
}

const interFont = Inter({
	subsets: ["latin"],
})

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<html lang="en">
			<body
				className={ interFont.className }
			>
				{ children }
			</body>
		</html>
	)

}
