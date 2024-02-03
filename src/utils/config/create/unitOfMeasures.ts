import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { DictionaryUnitOfMeasurePostBody } from "../../../api/types/dictionaryUnitOfMeasure/paramsAndBody";
import { ApiClient } from "../../../api";
import { FormikValues } from "formik";

export interface UnitOfMeasureKeys {
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

const unitOfMeasuresFormikConfig: FormikConfig = {
	initialValues: {
		code: "",
		name: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api: ApiClient) => {
		await api.DictionaryUnitOfMeasure.post(values as DictionaryUnitOfMeasurePostBody);
	},
};

const unitOfMeasuresFormikConfigEdit = (initialValues: UnitOfMeasureKeys): FormikConfig => {
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
				await api.DictionaryUnitOfMeasure.putById(id, values as DictionaryUnitOfMeasurePostBody);
			else await api.DictionaryUnitOfMeasure.patchById(id, differences as DictionaryUnitOfMeasurePostBody);
		},
	};
};

const columns = [
	{ label: "Kod", key: "code", type: "string", required: true },
	{ label: "Nazwa", key: "name", type: "string", required: true },
];

export const dialogUnitOfMeasuresConfig: FormConfig = {
	title: "Dodaj jednostkę miary",
	columns: columns,
	formikConfig: unitOfMeasuresFormikConfig,
};

export const dialogUnitOfMeasuresConfigEdit = (initialValues: UnitOfMeasureKeys): FormConfig => {
	return {
		title: "Edytuj jednostkę miary",
		columns: columns,
		formikConfig: unitOfMeasuresFormikConfigEdit(initialValues),
	};
};
