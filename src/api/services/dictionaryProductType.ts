import { ApiDefault } from "../apiDefault";
import { DictionaryProductTypeGetParams, DictionaryProductTypePostBody } from "../types/dictionaryProductType/paramsAndBody";
import {
	DictionaryProductTypeByIdGetResult,
	DictionaryProductTypeGetResult,
	DictionaryProductTypePostResult,
} from "../types/dictionaryProductType/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DictionaryProductTypeService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DictionaryProductTypeGetParams): Promise<HydraTemplateGet<DictionaryProductTypeGetResult>> {
		return await this.api.get<HydraTemplateGet<DictionaryProductTypeGetResult>>("/dictionary_product_types", params);
	}

	async post(body: DictionaryProductTypePostBody): Promise<DictionaryProductTypePostResult> {
		return await this.api.post<DictionaryProductTypePostResult>("/dictionary_product_types", body);
	}

	async getById(id: string): Promise<DictionaryProductTypeByIdGetResult> {
		return await this.api.get<DictionaryProductTypeByIdGetResult>(`/dictionary_product_types/${id}`);
	}

	async putById(id: string, body: DictionaryProductTypePostBody): Promise<DictionaryProductTypePostResult> {
		return await this.api.put<DictionaryProductTypePostResult>(`/dictionary_product_types/${id}`, body);
	}

	async patchById(id: string, body: DictionaryProductTypePostBody): Promise<DictionaryProductTypePostResult> {
		return await this.api.patch<DictionaryProductTypePostResult>(`/dictionary_product_types/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/dictionary_product_types/${id}`);
	}
}
