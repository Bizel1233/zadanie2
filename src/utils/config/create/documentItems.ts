import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DocumentItemPostBody } from "../../../api/types/documentItem/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface DocumentItemKeys {
	product: string;
	unitOfMeasure: string;
	quantity: string;
	grossPrice: string;
	dicountGrossValue: string;
}

const myValidate = (values: FormikValues) => {
	const errors: any = {};
	if (!values.product) {
		errors.product = "Pole wymagane";
	}
	if (!values.unitOfMeasure) {
		errors.unitOfMeasure = "Pole wymagane";
	}
	if (!values.quantity) {
		errors.quantity = "Pole wymagane";
	} else {
		values.quantity = Number(values.quantity).toFixed(0);
		if (values.quantity <= 0) errors.quantity = "Wartość musi być większa od 0";
	}
	if (!values.grossPrice) {
		errors.grossPrice = "Pole wymagane";
	} else {
		values.grossPrice = Number(values.grossPrice).toFixed(2);
		if (values.grossPrice <= 0) errors.grossPrice = "Wartość musi być większa od 0";
	}
	if (!values.dicountGrossValue) {
		errors.dicountGrossValue = "Pole wymagane";
	} else {
		values.dicountGrossValue = Number(values.dicountGrossValue).toFixed(2);
		if (values.dicountGrossValue <= 0) errors.dicountGrossValue = "Wartość musi być większa od 0";
	}
	return errors;
};

const documentItemFormikConfigCreate: FormikConfig = {
	initialValues: {
		product: "",
		unitOfMeasure: "",
		quantity: "",
		grossPrice: "",
		dicountGrossValue: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient) => {
		// await api.DocumentItem.post(values as DocumentItemPostBody);
	},
};

const documentItemFormikConfigEdit = (initialValues: DocumentItemKeys): FormikConfig => {
	return {
		initialValues: initialValues,
		validate: (values) => {
			return myValidate(values);
		},
		onSubmit: async (values, api, id) => {
			if (!id) throw new Error("Brak id");
			const differences = getDifferences(initialValues, values);
			if (Object.keys(differences).length === 0) return;
			if (Object.keys(differences).length === Object.keys(values).length)
				await api.DocumentItem.putById(id, values as DocumentItemPostBody);
			else await api.DocumentItem.patchById(id, differences as DocumentItemPostBody);
		},
	};
};

const columns = [
	{ label: "Dodaj produkt", key: "product", type: "select", required: true },
	{ label: "Dodaj jednostkę miary", key: "unitOfMeasure", type: "select", required: true },
	{ label: "Ilość", key: "quantity", type: "number", required: true },
	{ label: "Cena brutto", key: "grossPrice", type: "number", required: true },
	{ label: "Rabat", key: "dicountGrossValue", type: "number", required: true },
];

export const dialogItemConfig: FormConfig = {
	title: "Wartości produktu",
	columns: columns,
	formikConfig: documentItemFormikConfigCreate,
};

export const dialogItemConfigEdit = (initialValues: DocumentItemKeys): FormConfig => {
	return {
		title: "Edytuj kontrahenta",
		columns: columns,
		formikConfig: documentItemFormikConfigEdit(initialValues),
	};
};
