export interface HydraTemplateGet<T> {
	"hydra:member": T[];
	"hydra:totalItems": number;
	"hydra:view": {
		"@id": string;
		type: string;
		"hydra:first": string;
		"hydra:last": string;
		"hydra:previous": string;
		"hydra:next": string;
	};
	"hydra:search": {
		"@type": string;
		"hydra:template": string;
		"hydra:variableRepresentation": string;
		"hydra:mapping": [
			{
				"@type": string;
				variable: string;
				property: string;
				required: boolean;
			}
		];
	};
}

export interface DefaultGetParams {
	itemsPerPage: number;
	page: number;
}
