export interface GenericJson<DataType = unknown> {
	data: DataType,
	error: {
		code: string,
		message: string,
	} | null,
}
