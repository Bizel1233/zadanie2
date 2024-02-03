import { DictionaryContractorPostBody } from "../../../api/types/dictionaryContractor/paramsAndBody";
import { FormConfig, FormikConfig, getDifferences } from "./formConfig";
import { FormikValues } from "formik";

export interface ConstructorKeys {
	code: string;
	name: string;
	address: string;
	postcode: string;
	city: string;
	nip: string;
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
	if (!values.address) {
		errors.address = "Pole wymagane";
	} else if (values.address.length > 255) {
		errors.address = "Maksymalna długość adresu to 255 znaków";
	}
	if (!values.postcode) {
		errors.postcode = "Pole wymagane";
	} else if (values.postcode.length > 50) {
		errors.postcode = "Maksymalna długość kodu pocztowego to 50 znaków";
	}
	if (!values.city) {
		errors.city = "Pole wymagane";
	} else if (values.city.length > 255) {
		errors.city = "Maksymalna długość miasta to 255 znaków";
	}
	if (values.nip && values.nip.length > 25) {
		errors.nip = "Maksymalna długość NIP to 25 znaków";
	}
	return errors;
};

const contractorFormikConfigCreate: FormikConfig = {
	initialValues: {
		code: "",
		name: "",
		address: "",
		postcode: "",
		city: "",
		nip: "",
	},
	validate: (values) => {
		return myValidate(values);
	},
	onSubmit: async (values, api) => {
		await api.DictionaryContractor.post(values as DictionaryContractorPostBody);
	},
};

const contractorFormikConfigEdit = (initialValues: ConstructorKeys): FormikConfig => {
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
				await api.DictionaryContractor.putById(id, values as DictionaryContractorPostBody);
			else await api.DictionaryContractor.patchById(id, differences as DictionaryContractorPostBody);
		},
	};
};

const columns = [
	{ label: "Kod", key: "code", type: "string", required: true },
	{ label: "Nazwa", key: "name", type: "string", required: true },
	{ label: "Miasto", key: "city", type: "string", required: true },
	{ label: "Kod Pocztowy", key: "postcode", type: "string", required: true },
	{ label: "Adres", key: "address", type: "string", required: true },
	{ label: "NIP", key: "nip", type: "string" },
];

export const dialogContractorConfig: FormConfig = {
	title: "Dodaj kontrahenta",
	columns: columns,
	formikConfig: contractorFormikConfigCreate,
};

export const dialogContractorConfigEdit = (initialValues: ConstructorKeys): FormConfig => {
	return {
		title: "Edytuj kontrahenta",
		columns: columns,
		formikConfig: contractorFormikConfigEdit(initialValues),
	};
};
