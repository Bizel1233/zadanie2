export type DictionaryProductGetParams = {
	page: number;
	itemsPerPage: number;
	code?: string;
	name?: string;
	"order[name]"?: "asc" | "desc";
};

export type DictionaryProductPostBody = {
	code: string;
	name: string;
	type: string;
};
