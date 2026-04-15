import type * as ModelType from "@modules/model-type"

import * as ORM from "drizzle-orm/pg-core"

import type {
	UtilsType,
} from "@/types"

import {
	Base,
} from "../_base"

export const Topic = ORM.pgTable(
	"topic",
	{
		id: ORM.serial("id").primaryKey(),
		name: ORM.varchar({ length: 255 }).notNull(),
		...Base,
	},
)

export const __schemaCheck: UtilsType.Equals<typeof Topic["$inferSelect"], ModelType.Topic> = true
