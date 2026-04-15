import type {
	TSchema,
} from "@sinclair/typebox"

import type {
	JSONSchema4,
} from "json-schema"

import * as Type from "typebox"

/**
 * An helper for you to create JSON Schema for Generic JSON Response with an JavaScript data type.
 * If you pass the actual JSON Schema, this helper will use it as it is.
 * 
 * For an Array of type, you can pass an array with single item as a shortcut.
 * 
 * Shortcuts:
 * - `null` -> null
 * - `undefined` -> null
 * - `false` or `true` -> boolean
 * - string -> string
 * - any numbers -> number
 * - Array with single item -> Array of type
 */
export function createDataResponse(
	data: DataType | [DataType],
) {
	return Type.Object({
		data: jsPrimitiveParser(data),
		error: Type.Null(),
	})
}

function jsPrimitiveParser(data: DataType | [DataType]) {
	let dataSchema: JSONSchema4 = data as never

	if(typeof data === "string") {
		dataSchema = Type.String()
	} else if(typeof data === "number") {
		dataSchema = Type.Number()
	} else if(typeof data === "boolean") {
		dataSchema = Type.Boolean()
	} else if(typeof data === "undefined" || data === null) {
		dataSchema = Type.Null()
	} else if(Array.isArray(data)) {
		const item = data[0]
		dataSchema = Type.Array(jsPrimitiveParser(item))
	}

	return dataSchema
}

/**
 * It may better if know the generic type of Typebox generated schema,
 * so I don't have to include the `Type.TArray`, `Type.TObject`, etc.
 */
type DataType =
	| JSONSchema4
	| TSchema
	| Type.TArray
	| Type.TObject
	| string | number | boolean | undefined | null
