import { FormikValues } from "formik";
import { DialogInputProps } from "../../../components/create";
import { ApiClient } from "../../../api";

// * interejs tworzenia oraz edycji formularza
export interface FormConfig {
	title: string;
	columns: DialogInputProps[];
	formikConfig: FormikConfig;
}

// * interejs konfiguracji formik
export interface FormikConfig {
	initialValues: FormikValues;
	validate: (values: FormikValues) => ReturnType<typeof Object>;
	onSubmit: (values: FormikValues, api: ApiClient, id?: string) => Promise<void>;
}

// * interejs danych w 'dodatkowych' tabelach z selectem
export interface ReferenceArray {
	"@id": string;
	name: string;
}

interface AnyObject {
	[key: string]: any;
}

// * funkcja zwracająca różnice pomiędzy dwoma obiektami do edycji elementu
export const getDifferences = (initialValues: AnyObject, values: AnyObject): AnyObject => {
	const differences: AnyObject = {};

	const allKeys = new Set([...Object.keys(initialValues), ...Object.keys(values)]);

	allKeys.forEach((key) => {
		if (initialValues[key] !== values[key]) {
			differences[key] = values[key];
		}
	});

	return differences;
};

// * opcje wyboru ilości elementów na stronie
export const itemsPerPageOptions = [3, 5, 10, 25, 50, 100];
