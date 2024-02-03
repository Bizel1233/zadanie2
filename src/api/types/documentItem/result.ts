export type DocumentItemGetResult = {
	"@id": string;
	"@type": string;
	id: number;
	product: string;
	unitOfMeasure: string;
	quantity: string;
	grossPrice: string;
	dicountGrossValue: string;
	grossValue: string;
};

export type DocumentItemPostResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	document: string;
	product: string;
	unitOfMeasure: string;
	quantity: string;
	grossPrice: string;
	dicountGrossValue: string;
	grossValue: string;
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

export type DocumentItemByIdGetResult = {
	"@context": string;
	"@id": string;
	"@type": string;
	id: number;
	product: string;
	unitOfMeasure: string;
	quantity: string;
	grossPrice: string;
	dicountGrossValue: string;
	grossValue: string;
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
