import {
	Type,
} from "typebox"

import type {
	ResponseType,
} from "@/types"

export function createErrorResponse(
	err: NonNullable<ResponseType.GenericJson["error"]>,
	opts?: Type.TObjectOptions,
) {
	return Type.Object(
		{
			data: Type.Null(),
			error: Type.Object({
				code: Type.String({
					default: err.code,
				}),
				message: Type.String({
					default: err.message,
				}),
			}),
		},
		opts,
	)
}
