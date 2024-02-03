import { ApiDefault } from "../apiDefault";
import {
	DictionaryDocumentTypeGetParams,
	DictionaryDocumentTypePostBody,
} from "../types/dictionaryDocumentType/paramsAndBody";
import {
	DictionaryDocumentTypeByIdGetResult,
	DictionaryDocumentTypeGetResult,
	DictionaryDocumentTypePostResult,
} from "../types/dictionaryDocumentType/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DictionaryDocumentTypeService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DictionaryDocumentTypeGetParams): Promise<HydraTemplateGet<DictionaryDocumentTypeGetResult>> {
		return await this.api.get<HydraTemplateGet<DictionaryDocumentTypeGetResult>>("/dictionary_document_types", params);
	}

	async post(body: DictionaryDocumentTypePostBody): Promise<DictionaryDocumentTypePostResult> {
		return await this.api.post<DictionaryDocumentTypePostResult>("/dictionary_document_types", body);
	}

	async getById(id: string): Promise<DictionaryDocumentTypeByIdGetResult> {
		return await this.api.get<DictionaryDocumentTypeByIdGetResult>(`/dictionary_document_types/${id}`);
	}

	async putById(id: string, body: DictionaryDocumentTypePostBody): Promise<DictionaryDocumentTypePostResult> {
		return await this.api.put<DictionaryDocumentTypePostResult>(`/dictionary_document_types/${id}`, body);
	}

	async patchById(id: string, body: DictionaryDocumentTypePostBody): Promise<DictionaryDocumentTypePostResult> {
		return await this.api.patch<DictionaryDocumentTypePostResult>(`/dictionary_document_types/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/dictionary_document_types/${id}`);
	}
}
