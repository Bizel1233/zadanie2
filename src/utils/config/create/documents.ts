import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DocumentPostBody } from "../../../api/types/document/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface DocumentKeys {
	items: string[] | string;
	contractor: string;
	type: string;
	number: string;
}

const myValidate = (values: FormikValues) => {
	const errors: any = {};
	if (!values.contractor) {
		errors.contractor = "Pole wymagane";
	}
	if (!values.type) {
		errors.type = "Pole wymagane";
	}
	if (!values.number) {
		errors.number = "Pole wymagane";
	} else if (values.number.length > 255) {
		errors.number = "Maksymalna długość numeru to 255 znaków";
	}
	return errors;
};

const documentFormikConfig: FormikConfig = {
	initialValues: {
		items: "",
		contractor: "",
		type: "",
		number: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient): Promise<any> => {
		if (values.items == "") delete values.items;
		const data = { ...values };
		data.docDate = new Date();
		return await api.Documents.post(data as DocumentPostBody);
	},
};

const documentFormikConfigEdit = (initialValues: DocumentKeys): FormikConfig => {
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
				await api.Documents.putById(id, values as DocumentPostBody);
			else await api.Documents.patchById(id, differences as DocumentPostBody);
		},
	};
};

const columns = [
	{ label: "Dodaj kontrahenta", key: "contractor", type: "select", required: true },
	{ label: "Dodaj typ", key: "type", type: "select", required: true },
	{ label: "Numer", key: "number", type: "string", required: true },
	{ label: "Dodaj produkty", key: "items", type: "select" },
];

export const dialogDocumentConfig: FormConfig = {
	title: "Dodaj produkt",
	columns: columns,
	formikConfig: documentFormikConfig,
};

export const dialogDocumentConfigEdit = (initialValues: DocumentKeys): FormConfig => {
	return {
		title: "Edytuj dokument",
		columns: columns,
		formikConfig: documentFormikConfigEdit(initialValues),
	};
};
