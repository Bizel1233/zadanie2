export type DictionaryProductTypeGetResult = {
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
};

export type DictionaryProductTypePostResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
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

export type DictionaryProductTypeByIdGetResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
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
