export type DocumentItemGetParams = {
	page: number;
	itemsPerPage: number;
	"product.name"?: string;
	"order[name]"?: "asc" | "desc";
};

export type DocumentItemPostBody = {
	product: string;
	unitOfMeasure: string;
	quantity: string;
	grossPrice: string;
	dicountGrossValue: string;
};
