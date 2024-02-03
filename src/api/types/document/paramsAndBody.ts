import { number } from "prop-types";
import { DocumentItemPostBody } from "../documentItem/paramsAndBody";

export type DocumentGetParams = {
	page: number;
	itemsPerPage: number;
	number?: string;
	"contractor.name"?: string;
	"order[id]"?: "asc" | "desc";
	"order[number]"?: "asc" | "desc";
};

export type DocumentPostBody = {
	items: (DocumentItemPostBody | string)[];
	contractor: string;
	docDate: string;
	type: string;
	number: string;
};
