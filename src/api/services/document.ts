import { ApiDefault } from "../apiDefault";
import { DocumentGetParams, DocumentPostBody } from "../types/document/paramsAndBody";
import { DocumentByIdGetResult, DocumentGetResult, DocumentPostResult } from "../types/document/result";
import { HydraTemplateGet } from "../types/hydraTemplate";

export class DocumentService {
	private api: ApiDefault;

	constructor(api: ApiDefault) {
		this.api = api;
	}

	async get(params: DocumentGetParams): Promise<HydraTemplateGet<DocumentGetResult>> {
		return await this.api.get<HydraTemplateGet<DocumentGetResult>>("/documents", params);
	}

	async post(body: DocumentPostBody): Promise<DocumentPostResult> {
		return await this.api.post<DocumentPostResult>("/documents", body);
	}

	async getById(id: string): Promise<DocumentByIdGetResult> {
		return await this.api.get<DocumentByIdGetResult>(`/documents/${id}`);
	}

	async putById(id: string, body: DocumentPostBody): Promise<DocumentPostResult> {
		return await this.api.put<DocumentPostResult>(`/documents/${id}`, body);
	}

	async patchById(id: string, body: DocumentPostBody): Promise<DocumentPostResult> {
		return await this.api.patch<DocumentPostResult>(`/documents/${id}`, body);
	}

	async deleteById(id: string): Promise<void> {
		await this.api.delete(`/documents/${id}`);
	}
}
