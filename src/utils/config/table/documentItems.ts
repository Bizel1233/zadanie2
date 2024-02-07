import { ApiClient } from "../../../api";
import { DocumentItemGetParams } from "../../../api/types/documentItem/paramsAndBody";
import { TableComponentColumn } from "../../../components/table/context";
import { TableConfig } from "./tableConfig";

const columns = (): TableComponentColumn[] => [
	{ label: "Id", key: "id", type: "string" },
	{ label: "Product", key: "product", type: "string", filter: true, sort: true, sortKey: "order[product.name]" },
	{ label: "Jednostka Miary", key: "unitOfMeasure", type: "string" },
	{ label: "Ilość", key: "quantity", type: "string" },
	{ label: "Cena Brutto", key: "grossPrice", type: "string" },
	{ label: "Rabat", key: "dicountGrossValue", type: "string" },
	{ label: "Łączna Wartość Brutto", key: "grossValue", type: "string" },
];

const getData = async (api: ApiClient, params: DocumentItemGetParams) => {
	const data = await api.DocumentItem.get(params);

	data["hydra:member"] = await Promise.all(
		data["hydra:member"].map(
			async ({ product, unitOfMeasure, quantity, grossPrice, dicountGrossValue, grossValue, ...item }) => {
				const productData = await api.DictionaryProduct.getById(product.split("/")[2]);
				const unitOfMeasureData = await api.DictionaryUnitOfMeasure.getById(unitOfMeasure.split("/")[2]);
				return {
					product: productData.name,
					productID: productData["@id"],
					unitOfMeasure: unitOfMeasureData.name,
					unitOfMeasureID: unitOfMeasureData["@id"],
					quantity: Number(quantity).toFixed(0),
					grossPrice: Number(grossPrice).toFixed(2),
					dicountGrossValue: Number(dicountGrossValue).toFixed(2),
					grossValue: Number(grossValue).toFixed(2),
					...item,
				};
			}
		)
	);

	return data;
};

const deleteData = async (api: ApiClient, id: string[]) => {
	id.map(async (id) => {
		await api.DocumentItem.deleteById(id);
	});
};

export const tableDocumentItemsConfig: TableConfig = {
	columns,
	getData,
	deleteData,
};
