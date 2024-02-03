export type DictionaryContractorGetResult = {
	"@id": string;
	"@type": string;
	id: number;
	code: string;
	name: string;
	address: string;
	postcode: string;
	city: string;
	nip: string;
	info: string;
};

export type DictionaryContractorPostResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: 0;
	code: string;
	name: string;
	address: string;
	postcode: string;
	city: string;
	createdAt: string;
	createdBy: {
		"@context": string;
		"@id": string;
		"@type": string;
		id: 0;
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
		id: 0;
		email: string;
		roles: [string];
		password: string;
		userIdentifier: string;
		username: string;
		salt: string;
	};
	nip: string;
	info: string;
};

export type DictionaryContractorByIdGetResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: 0;
	code: string;
	name: string;
	address: string;
	postcode: string;
	city: string;
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
	nip: string;
	info: string;
};
