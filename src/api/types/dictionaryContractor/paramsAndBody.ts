export type DictionaryContractorGetParams = {
	page: number;
	itemsPerPage: number;
	code?: string;
	name?: string;
	"order[name]"?: "asc" | "desc";
};

export type DictionaryContractorPostBody = {
	code: string;
	name: string;
	address: string;
	postcode: string;
	city: string;
	nip?: string;
};
