export type DictionaryUnitOfMeasureGetParams = {
	page: number;
	itemsPerPage: number;
	code?: string;
	name?: string;
	"order[name]"?: "asc" | "desc";
};

export type DictionaryUnitOfMeasurePostBody = {
	code: "string";
	name: "string";
};
