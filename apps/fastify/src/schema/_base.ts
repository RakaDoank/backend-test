import type * as ModelType from "@modules/model-type"

import * as ORM from "drizzle-orm/pg-core"

import type {
	UtilsType,
} from "@/types"

/**
 * This is just a base schema declaration, not an actual schema, or a table in the database.
 * 
 * We need to treat timestamp as a Date in string to generate
 * correct JSON Schema.
 */
export const Base: {
	created_at: ORM.PgTimestampStringBuilderInitial<"">,
	updated_at: ORM.PgTimestampStringBuilderInitial<"">,
} = {
	created_at: ORM.timestamp({ mode: "string" }).notNull().defaultNow(),
	updated_at: ORM.timestamp({ mode: "string" }),
}

export const __schemaCheck: UtilsType.Equals<{ [Key in keyof ModelType.Base]: unknown }, { [Key in keyof typeof Base]: unknown }> = true
