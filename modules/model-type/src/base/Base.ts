/**
 * At this moment, I don't provide the soft delete,
 * for instance, `deleted_at`
 */
export interface Base {
	created_at: string | null,
	updated_at: string | null,
}
