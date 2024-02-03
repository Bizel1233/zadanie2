import { DocumentItemByIdGetResult, DocumentItemGetResult } from "../documentItem/result";

export type DocumentGetResult = {
	"@id": string;
	"@type": string;
	id: number;
	items: DocumentItemGetResult[];
	contractor: string;
	docDate: string;
	type: string;
	number: string;
};

export type DocumentPostResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	items: string[];
	contractor: string;
	docDate: string;
	type: string;
	number: string;
	createdAt: string;
	createdBy: {
		"@context": string;
		"@id": string;
		"@type": string;
		id: number;
		email: string;
		roles: [string];
		password: string;
		userIdentifier: string;
		username: string;
		salt: string;
	};
	updatedAt: string;
	updatedBy: {
		"@context": string;
		"@id": string;
		"@type": string;
		id: number;
		email: string;
		roles: [string];
		password: string;
		userIdentifier: string;
		username: string;
		salt: string;
	};
};

export type DocumentByIdGetResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	items: DocumentItemByIdGetResult[];
	contractor: string;
	docDate: string;
	type: string;
	number: string;
	createdAt: string;
	createdBy: {
		"@context": string;
		"@id": string;
		"@type": string;
	};
	updatedAt: string;
	updatedBy: {
		"@context": string;
		"@id": string;
		"@type": string;
	};
};
