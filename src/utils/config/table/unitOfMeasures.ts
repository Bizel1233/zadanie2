import { ApiClient } from "../../../api";
import { DictionaryUnitOfMeasureGetParams } from "../../../api/types/dictionaryUnitOfMeasure/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Id", key: "id", type: "string" },
	{ label: "Kod", key: "code", type: "string", filter: true },
	{ label: "Nazwa", key: "name", type: "string", filter: true, sort: true, sortKey: "order[name]" },
];

const getData = async (api: ApiClient, params: DictionaryUnitOfMeasureGetParams) => {
	return await api.DictionaryUnitOfMeasure.get(params);
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DictionaryUnitOfMeasure.deleteById(id);
	});
};

export const tableUnitOfMeasuresConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
