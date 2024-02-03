import { ApiClient } from "../../../api";
import { DictionaryContractorGetParams } from "../../../api/types/dictionaryContractor/paramsAndBody";
import { HydraTemplateGet } from "../../../api/types/hydraTemplate";
import { positionKeys } from "../../../components/navigation";
import { TableComponentColumn } from "../../../components/table/context";
import { tableContractorConfig } from "./contractors";
import { tableDocumentItemsConfig } from "./documentItems";
import { tableDocumentConfig } from "./documents";
import { tableProductConfig } from "./product";
import { tableTypeDocumentConfig } from "./typeDocument";
import { tableTypeProductConfig } from "./typeProduct";
import { tableUnitOfMeasuresConfig } from "./unitOfMeasures";

export interface SortTemplate {
	[key: string]: "asc" | "desc";
}

// * interejs konfiguracji tabeli
export interface TableConfig {
	columns: () => TableComponentColumn[];
	getData: (api: ApiClient, params: DictionaryContractorGetParams) => Promise<HydraTemplateGet<any>>;
	deleteData: (api: ApiClient, id: string[]) => Promise<void>;
}

export const OnDeleteSwitch = (api: ApiClient, id: string[], navigation: positionKeys) => {
	switch (navigation) {
		case "contractors":
			tableContractorConfig.deleteData(api, id);
			break;
		case "documentType":
			tableTypeDocumentConfig.deleteData(api, id);
			break;
		case "productType":
			tableTypeProductConfig.deleteData(api, id);
			break;
		case "product":
			tableProductConfig.deleteData(api, id);
			break;
		case "unitOfMeasure":
			tableUnitOfMeasuresConfig.deleteData(api, id);
			break;
		case "item":
			tableDocumentItemsConfig.deleteData(api, id);
			break;
		case "document":
			tableDocumentConfig.deleteData(api, id);
			break;
	}
};
