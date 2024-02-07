import { ApiClient } from "../../../api";
import { DocumentGetParams } from "../../../api/types/document/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Id", key: "id", type: "string", sort: true, sortKey: "order[id]" },
	{ label: "Kontrahent", key: "contractor", type: "string", filter: true },
	{ label: "Numer", key: "number", type: "string", filter: true, sort: true, sortKey: "order[number]" },
	{ label: "Typ", key: "type", type: "string" },
	{ label: "Data", key: "docDate", type: "string" },
	{
		label: "Produkty",
		key: "items",
		type: "object",
		additionalObjectDisplay: [
			{ label: "Identyfikator", key: "id" },
			{ label: "Produkt", key: "product" },
			{ label: "Jednostka Miary", key: "unitOfMeasure" },
			{ label: "Ilość", key: "quantity" },
			{ label: "Wartość Brutto", key: "grossPrice" },
			{ label: "Rabat", key: "dicountGrossValue" },
			{ label: "Łączna Wartość Brutto ", key: "grossValue" },
		],
	},
];

const getData = async (api: ApiClient, params: DocumentGetParams) => {
	const data = await api.Documents.get(params);
	data["hydra:member"] = await Promise.all(
		data["hydra:member"].map(async ({ contractor, type, docDate, ...item }) => {
			const contractorData = await api.DictionaryContractor.getById(contractor.split("/")[2]);
			const typeData = await api.DictionaryDocumentType.getById(type.split("/")[2]);
			return {
				contractor: contractorData.name,
				contractorID: contractorData["@id"],
				type: typeData.name,
				typeID: typeData["@id"],
				docDate: new Date(docDate).toLocaleDateString(),
				...item,
			};
		})
	);
	return data;
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.Documents.deleteById(id);
	});
};

export const tableDocumentConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
