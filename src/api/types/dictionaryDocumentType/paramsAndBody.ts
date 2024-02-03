export type DictionaryDocumentTypeGetParams = {
	page: number;
	itemsPerPage: number;
	code?: string;
	name?: string;
	"order[name]"?: "asc" | "desc";
};

export type DictionaryDocumentTypePostBody = {
	code: "string";
	name: "string";
};
