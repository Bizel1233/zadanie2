export type DictionaryProductGetResult = {
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
	type: string;
};

export type DictionaryProductPostResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
	type: string;
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

export type DictionaryProductByIdGetResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
	type: string;
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
