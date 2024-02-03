import { ApiDefault, ApiDefaultProps } from "./apiDefault";
import { DictionaryDocumentTypeService } from "./services/dictionaryDocumentType";
import { DictionaryContractorService } from "./services/dictionaryContractor";
import { DictionaryProductTypeService } from "./services/dictionaryProductType";
import { DictionaryUnitOfMeasureService } from "./services/dictionaryUnitOfMeasure";
import { DocumentItemService } from "./services/documentItem";
import { DocumentService } from "./services/document";
import { DictionaryProductService } from "./services/dictionaryProduct";

export class ApiClient {
	DictionaryContractor: DictionaryContractorService;
	DictionaryDocumentType: DictionaryDocumentTypeService;
	DictionaryProductType: DictionaryProductTypeService;
	DictionaryProduct: DictionaryProductService;
	DictionaryUnitOfMeasure: DictionaryUnitOfMeasureService;
	DocumentItem: DocumentItemService;
	Documents: DocumentService;

	constructor({ baseURL, token, handleUnauthorized, handleErrorMessage }: ApiDefaultProps) {
		const apiProvider = new ApiDefault({ baseURL, token, handleUnauthorized, handleErrorMessage });

		this.DictionaryContractor = new DictionaryContractorService(apiProvider);
		this.DictionaryDocumentType = new DictionaryDocumentTypeService(apiProvider);
		this.DictionaryProductType = new DictionaryProductTypeService(apiProvider);
		this.DictionaryProduct = new DictionaryProductService(apiProvider);
		this.DictionaryUnitOfMeasure = new DictionaryUnitOfMeasureService(apiProvider);
		this.DocumentItem = new DocumentItemService(apiProvider);
		this.Documents = new DocumentService(apiProvider);
	}
}
