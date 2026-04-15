import type {
	ResponseType,
} from "@/types"

export const NotFound = {
	data: null,
	error: {
		code: "NOT_FOUND",
		message: "Not found",
	},
} satisfies ResponseType.GenericJson
