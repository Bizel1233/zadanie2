import { ApiClient } from "../../../api";
import { DictionaryDocumentTypeGetParams } from "../../../api/types/dictionaryDocumentType/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Id", key: "id", type: "string" },
	{ label: "Kod", key: "code", type: "string", filter: true },
	{ label: "Nazwa", key: "name", type: "string", filter: true, sort: true, sortKey: "order[name]" },
];

const getData = async (api: ApiClient, params: DictionaryDocumentTypeGetParams) => {
	return await api.DictionaryDocumentType.get(params);
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DictionaryDocumentType.deleteById(id);
	});
};

export const tableTypeDocumentConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
