import type * as ModelType from "@modules/model-type"

import * as ORM from "drizzle-orm/pg-core"

import type {
	UtilsType,
} from "@/types"

import {
	Base,
} from "../_base"

import {
	NewsStatus,
} from "../news-status"

export const News = ORM.pgTable(
	"news",
	{
		id: ORM.serial("id").primaryKey(),
		title: ORM.varchar({ length: 255 }).notNull(),
		content: ORM.text().notNull(),
		status: NewsStatus().notNull(),
		...Base,
	},
)

export const __schemaCheck: UtilsType.Equals<typeof News["$inferSelect"], ModelType.News> = true
