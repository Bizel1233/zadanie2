import { ApiDefault } from "../apiDefault";
import { DictionaryProductGetParams, DictionaryProductPostBody } from "../types/dictionaryProduct/paramsAndBody";
import {
	DictionaryProductByIdGetResult,
	DictionaryProductGetResult,
	DictionaryProductPostResult,
} from "../types/dictionaryProduct/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DictionaryProductService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DictionaryProductGetParams): Promise<HydraTemplateGet<DictionaryProductGetResult>> {
		return await this.api.get<HydraTemplateGet<DictionaryProductGetResult>>("/dictionary_products", params);
	}

	async post(body: DictionaryProductPostBody): Promise<DictionaryProductPostResult> {
		return await this.api.post<DictionaryProductPostResult>("/dictionary_products", body);
	}

	async getById(id: string): Promise<DictionaryProductByIdGetResult> {
		return await this.api.get<DictionaryProductByIdGetResult>(`/dictionary_products/${id}`);
	}

	async putById(id: string, body: DictionaryProductPostBody): Promise<DictionaryProductPostResult> {
		return await this.api.put<DictionaryProductPostResult>(`/dictionary_products/${id}`, body);
	}

	async patchById(id: string, body: DictionaryProductPostBody): Promise<DictionaryProductPostResult> {
		return await this.api.patch<DictionaryProductPostResult>(`/dictionary_products/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/dictionary_product/${id}`);
	}
}
