import type {
	Base,
} from "../base"

export interface News extends Base {
	id: number,
	title: string,
	content: string,
	status: "draft" | "deleted" | "published",
}
