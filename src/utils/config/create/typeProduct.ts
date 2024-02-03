import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DictionaryProductTypePostBody } from "../../../api/types/dictionaryProductType/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface ProductTypeKeys {
	code: string;
	name: string;
}

const myValidate = (values: FormikValues) => {
	const errors: any = {};
	if (!values.code) {
		errors.code = "Pole wymagane";
	} else if (values.code.length > 4) {
		errors.code = "Maksymalna długość kodu to 4 znaki";
	}
	if (!values.name) {
		errors.name = "Pole wymagane";
	} else if (values.name.length > 255) {
		errors.name = "Maksymalna długość nazwy to 255 znaków";
	}
	return errors;
};

const productTypeFormikConfig: FormikConfig = {
	initialValues: {
		code: "",
		name: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient) => {
		await api.DictionaryProductType.post(values as DictionaryProductTypePostBody);
	},
};

const productTypeFormikConfigEdit = (initialValues: ProductTypeKeys): FormikConfig => {
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
				await api.DictionaryProductType.putById(id, values as DictionaryProductTypePostBody);
			else await api.DictionaryProductType.patchById(id, differences as DictionaryProductTypePostBody);
		},
	};
};

const columns = [
	{ label: "Kod", key: "code", type: "string", required: true },
	{ label: "Nazwa", key: "name", type: "string", required: true },
];

export const dialogProductTypeConfig: FormConfig = {
	title: "Dodaj typ produktu",
	columns: columns,
	formikConfig: productTypeFormikConfig,
};

export const dialogProductTypeConfigEdit = (initialValues: ProductTypeKeys): FormConfig => {
	return {
		title: "Edytuj typ produktu",
		columns: columns,
		formikConfig: productTypeFormikConfigEdit(initialValues),
	};
};
