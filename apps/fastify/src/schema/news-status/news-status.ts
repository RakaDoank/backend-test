import type * as ModelType from "@modules/model-type"

import * as ORM from "drizzle-orm/pg-core"

import type {
	UtilsType,
} from "@/types"

export const NewsStatus = ORM.pgEnum(
	"news_status",
	[
		"draft",
		"deleted",
		"published",
	],
)

type NewsStatusDataType = ReturnType<typeof NewsStatus>["_"]["data"]

export const __schemaCheck: UtilsType.Equals<NewsStatusDataType, ModelType.News["status"]> = true
