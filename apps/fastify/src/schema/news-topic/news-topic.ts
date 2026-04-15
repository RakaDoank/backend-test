import type * as ModelType from "@modules/model-type"

import * as ORM from "drizzle-orm/pg-core"

import type {
	UtilsType,
} from "@/types"

import {
	Base,
} from "../_base"

import {
	News,
} from "../news"

import {
	Topic,
} from "../topic"

export const NewsTopic = ORM.pgTable(
	"news_topic",
	{
		news_id: ORM.serial().references(() => News.id).notNull(),
		topic_id: ORM.serial().references(() => Topic.id).notNull(),
		...Base,
	},
	table => [
		// Composite Primary Key
		// A news can't has duplicate topic
		ORM.primaryKey({
			columns: [
				table.news_id,
				table.topic_id,
			],
		}),
	],
)

export const __schemaCheck: UtilsType.Equals<typeof NewsTopic["$inferSelect"], ModelType.NewsTopic> = true
