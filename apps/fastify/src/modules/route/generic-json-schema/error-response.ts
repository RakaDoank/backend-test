import * as Type from "typebox"

export const ErrorResponse = Type.Object({
	data: Type.Null(),
	error: Type.Object({
		code: Type.String(),
		message: Type.String(),
	}),
})
