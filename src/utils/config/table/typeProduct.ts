import { ApiClient } from "../../../api";
import { DictionaryProductGetParams } from "../../../api/types/dictionaryProduct/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Identyfikator", key: "id", type: "string" },
	{ label: "Kod", key: "code", type: "string", filter: true },
	{ label: "Nazwa", key: "name", type: "string", filter: true, sort: true, sortKey: "order[name]" },
];

const getData = async (api: ApiClient, params: DictionaryProductGetParams) => {
	return await api.DictionaryProductType.get(params);
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DictionaryProductType.deleteById(id);
	});
};

export const tableTypeProductConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
