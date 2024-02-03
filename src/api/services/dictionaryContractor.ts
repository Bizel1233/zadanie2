import { ApiDefault } from "../apiDefault";
import { DictionaryContractorGetParams, DictionaryContractorPostBody } from "../types/dictionaryContractor/paramsAndBody";
import {
	DictionaryContractorByIdGetResult,
	DictionaryContractorGetResult,
	DictionaryContractorPostResult,
} from "../types/dictionaryContractor/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DictionaryContractorService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DictionaryContractorGetParams): Promise<HydraTemplateGet<DictionaryContractorGetResult>> {
		return await this.api.get<HydraTemplateGet<DictionaryContractorGetResult>>("/dictionary_contractors", params);
	}

	async post(body: DictionaryContractorPostBody): Promise<DictionaryContractorPostResult> {
		return await this.api.post<DictionaryContractorPostResult>("/dictionary_contractors", body);
	}

	async getById(id: string): Promise<DictionaryContractorByIdGetResult> {
		return await this.api.get<DictionaryContractorByIdGetResult>(`/dictionary_contractors/${id}`);
	}

	async putById(id: string, body: DictionaryContractorPostBody): Promise<DictionaryContractorPostResult> {
		return await this.api.put<DictionaryContractorPostResult>(`/dictionary_contractors/${id}`, body);
	}

	async patchById(id: string, body: DictionaryContractorPostBody): Promise<DictionaryContractorPostResult> {
		return await this.api.patch<DictionaryContractorPostResult>(`/dictionary_contractors/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/dictionary_contractors/${id}`);
	}
}
