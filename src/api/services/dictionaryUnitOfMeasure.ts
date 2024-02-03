import { ApiDefault } from "../apiDefault";
import {
	DictionaryUnitOfMeasureGetParams,
	DictionaryUnitOfMeasurePostBody,
} from "../types/dictionaryUnitOfMeasure/paramsAndBody";
import {
	DictionaryUnitOfMeasureByIdGetResult,
	DictionaryUnitOfMeasureGetResult,
	DictionaryUnitOfMeasurePostResult,
} from "../types/dictionaryUnitOfMeasure/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DictionaryUnitOfMeasureService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DictionaryUnitOfMeasureGetParams): Promise<HydraTemplateGet<DictionaryUnitOfMeasureGetResult>> {
		return await this.api.get<HydraTemplateGet<DictionaryUnitOfMeasureGetResult>>("/dictionary_unit_of_measures", params);
	}

	async post(body: DictionaryUnitOfMeasurePostBody): Promise<DictionaryUnitOfMeasurePostResult> {
		return await this.api.post<DictionaryUnitOfMeasurePostResult>("/dictionary_unit_of_measures", body);
	}

	async getById(id: string): Promise<DictionaryUnitOfMeasureByIdGetResult> {
		return await this.api.get<DictionaryUnitOfMeasureByIdGetResult>(`/dictionary_unit_of_measures/${id}`);
	}

	async putById(id: string, body: DictionaryUnitOfMeasurePostBody): Promise<DictionaryUnitOfMeasurePostResult> {
		return await this.api.put<DictionaryUnitOfMeasurePostResult>(`/dictionary_unit_of_measures/${id}`, body);
	}

	async patchById(id: string, body: DictionaryUnitOfMeasurePostBody): Promise<DictionaryUnitOfMeasurePostResult> {
		return await this.api.patch<DictionaryUnitOfMeasurePostResult>(`/dictionary_unit_of_measures/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/dictionary_unit_of_measures/${id}`);
	}
}
