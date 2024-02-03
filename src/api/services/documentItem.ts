import { ApiDefault } from "../apiDefault";
import { DocumentItemGetParams, DocumentItemPostBody } from "../types/documentItem/paramsAndBody";
import { DocumentItemByIdGetResult, DocumentItemGetResult, DocumentItemPostResult } from "../types/documentItem/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DocumentItemService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DocumentItemGetParams): Promise<HydraTemplateGet<DocumentItemGetResult>> {
		return await this.api.get<HydraTemplateGet<DocumentItemGetResult>>("/document_items", params);
	}

	async post(body: DocumentItemPostBody): Promise<DocumentItemPostResult> {
		return await this.api.post<DocumentItemPostResult>("/document_items", body);
	}

	async getById(id: string): Promise<DocumentItemByIdGetResult> {
		return await this.api.get<DocumentItemByIdGetResult>(`/document_items/${id}`);
	}

	async putById(id: string, body: DocumentItemPostBody): Promise<DocumentItemPostResult> {
		return await this.api.put<DocumentItemPostResult>(`/document_items/${id}`, body);
	}

	async patchById(id: string, body: DocumentItemPostBody): Promise<DocumentItemPostResult> {
		return await this.api.patch<DocumentItemPostResult>(`/document_items/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/document_items/${id}`);
	}
}
