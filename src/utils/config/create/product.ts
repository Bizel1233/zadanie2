import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DictionaryProductPostBody } from "../../../api/types/dictionaryProduct/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface ProductKeys {
	code: string;
	name: string;
	type: string;
}

const myValidate = (values: FormikValues) => {
	const errors: any = {};
	if (!values.code) {
		errors.code = "Pole wymagane";
	} else if (values.code.length > 10) {
		errors.code = "Maksymalna długość kodu to 10 znaków";
	}
	if (!values.name) {
		errors.name = "Pole wymagane";
	} else if (values.name.length > 255) {
		errors.name = "Maksymalna długość nazwy to 255 znaków";
	}
	if (!values.type) {
		errors.type = "Pole wymagane";
	}
	return errors;
};

const productFormikConfig: FormikConfig = {
	initialValues: {
		code: "",
		name: "",
		type: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient) => {
		await api.DictionaryProduct.post(values as DictionaryProductPostBody);
	},
};

const productFormikConfigEdit = (initialValues: ProductKeys): FormikConfig => {
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
				await api.DictionaryProduct.putById(id, values as DictionaryProductPostBody);
			else await api.DictionaryProduct.patchById(id, differences as DictionaryProductPostBody);
		},
	};
};

const columns = [
	{ label: "Kod", key: "code", type: "string", required: true },
	{ label: "Nazwa", key: "name", type: "string", required: true },
	{ label: "Dodaj typ produktu", key: "type", type: "select", required: true },
];

export const dialogProductConfig: FormConfig = {
	title: "Dodaj produkt",
	columns: columns,
	formikConfig: productFormikConfig,
};

export const dialogProductConfigEdit = (initialValues: ProductKeys): FormConfig => {
	return {
		title: "Edytuj produkt",
		columns: columns,
		formikConfig: productFormikConfigEdit(initialValues),
	};
};
