import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DictionaryDocumentTypePostBody } from "../../../api/types/dictionaryDocumentType/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface DocumentTypeKeys {
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

const documentTypeFormikConfig: FormikConfig = {
	initialValues: {
		code: "",
		name: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient) => {
		await api.DictionaryDocumentType.post(values as DictionaryDocumentTypePostBody);
	},
};

const documentTypeFormikConfigEdit = (initialValues: DocumentTypeKeys): FormikConfig => {
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
				await api.DictionaryDocumentType.putById(id, values as DictionaryDocumentTypePostBody);
			else await api.DictionaryDocumentType.patchById(id, differences as DictionaryDocumentTypePostBody);
		},
	};
};

const columns = [
	{ label: "Kod", key: "code", type: "string", required: true },
	{ label: "Nazwa", key: "name", type: "string", required: true },
];

export const dialogDocumentTypeConfig: FormConfig = {
	title: "Dodaj typ dokumentu",
	columns: columns,
	formikConfig: documentTypeFormikConfig,
};

export const dialogDocumentTypeConfigEdit = (initialValues: DocumentTypeKeys): FormConfig => {
	return {
		title: "Edytuj typ dokumentu",
		columns: columns,
		formikConfig: documentTypeFormikConfigEdit(initialValues),
	};
};
