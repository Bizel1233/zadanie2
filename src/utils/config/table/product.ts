import { ApiClient } from "../../../api";
import { DictionaryProductGetParams } from "../../../api/types/dictionaryProduct/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Identyfikator", key: "id", type: "string" },
	{ label: "Kod", key: "code", type: "string", filter: true },
	{ label: "Nazwa", key: "name", type: "string", filter: true, sort: true, sortKey: "order[name]" },
	{ label: "Typ", key: "type", type: "string" },
];

const getData = async (api: ApiClient, params: DictionaryProductGetParams) => {
	const data = await api.DictionaryProduct.get(params);
	data["hydra:member"] = await Promise.all(
		data["hydra:member"].map(async ({ ...item }) => {
			// const productType = await api.DictionaryProductType.getById(type.split("/")[2]);
			return {
				...item,
			};
		})
	);
	return data;
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DictionaryProduct.deleteById(id);
	});
};

export const tableProductConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
