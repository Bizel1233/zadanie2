import { ApiClient } from "../../../api";
import { DictionaryContractorGetParams } from "../../../api/types/dictionaryContractor/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Id", key: "id", type: "string" },
	{ label: "Kod", key: "code", type: "string", filter: true },
	{ label: "Nazwa", key: "name", type: "string", filter: true, sort: true, sortKey: "order[name]" },
	{ label: "Miasto", key: "city", type: "string" },
	{ label: "Kod Pocztowy", key: "postcode", type: "string" },
	{ label: "NIP", key: "nip", type: "string" },
];

const getData = async (api: ApiClient, params: DictionaryContractorGetParams) => {
	return await api.DictionaryContractor.get(params);
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DictionaryContractor.deleteById(id);
	});
};

export const tableContractorConfig: TableConfig = {
	columns,
	deleteData,
	getData,
};
