import {
	Type,
} from "typebox"

export const NotFoundResponse =
	Type.Object({
		data: Type.Null(),
		error: Type.Object({
			code: Type.String({
				default: "NOT_FOUND",
			}),
			message: Type.String({
				default: "Not found",
			}),
		}),
	})
