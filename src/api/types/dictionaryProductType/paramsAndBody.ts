export type DictionaryProductTypeGetParams = {
	page: number;
	itemsPerPage: number;
	code?: string;
	name?: string;
	"order[name]"?: "asc" | "desc";
};

export type DictionaryProductTypePostBody = {
	code: "string";
	name: "string";
};
