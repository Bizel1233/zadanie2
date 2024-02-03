import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack, TextField } from "@mui/material";
import { FormConfig, ReferenceArray } from "../../utils/config/create/formConfig";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ApiClient } from "../../api";
import SelectTable from "./selectTable";
import { positionKeys } from "../navigation";
import { DocumentItemPostBody } from "../../api/types/documentItem/paramsAndBody";

export interface DialogInputProps {
	label: string;
	key: string;
	type: string;
	required?: boolean;
	create?: {
		createFormConfig?: FormConfig;
		open: boolean;
		setOpen: (value: boolean) => void;
		onCreated: () => void;
	};
	select?: {
		options: ReferenceArray[];
		open: boolean;
		setOpen: (value: boolean) => void;
		title: string;
		page: number;
		itemsPerPage: number;
		itemsPerPageOptions: number[];
		countPage: number;
		setPage: (value: number) => void;
		setItemsPerPage: (value: number) => void;
		selected?: string;
		setSelected?: (value: string) => void;
		selectedItems?: string[];
		setSelectedItems?: (value: string[]) => void;
	};
}

interface props {
	api: ApiClient;
	open: boolean;
	onClose: () => void;
	formConfig: FormConfig;
	onCreated: () => void;
	minWidth?: string;
	refetch?: () => void;
	isLoading?: boolean;
	editID?: string | undefined;
	editReload?: boolean;
	navigation: positionKeys;
	onItemsCreated?: (items: DocumentItemPostBody) => void;
}

export default function DialogComponent({
	api,
	open,
	onClose,
	formConfig,
	onCreated,
	minWidth,
	isLoading,
	editID,
	editReload,
	navigation,
	onItemsCreated,
}: props) {
	const formik = useFormik({
		initialValues: formConfig.formikConfig.initialValues,
		validateOnChange: true,
		validate: (values) => {
			return formConfig.formikConfig.validate(values);
		},
		onSubmit: async (values, formikHelpers) => {
			// * Jeżeli jesteśmy w trybie edycji to wywołujemy funkcję onSubmit z editID
			if (editID !== undefined) return await formConfig.formikConfig.onSubmit(values, api, editID);

			// * jeżeli dodajemy dokument to wszystkie nowo stworzone elementy documentItem dodajemy do formik.values.items
			if (values.items !== undefined) values.items = [...values.items, ...newItems];
			await formConfig.formikConfig.onSubmit(values, api);
			onItemsCreated?.(values as DocumentItemPostBody);
			formikHelpers.resetForm();
		},
		initialErrors: {},
	});

	const [prevEditID, setPrevEditID] = useState<string | undefined>(undefined);
	const [newItems, setNewItems] = useState<DocumentItemPostBody[]>([]);

	// * jeżeli jesteśmy w trybie edycji i zmienił się editID to ustawiamy wartości na nowe
	useEffect(() => {
		if (editID !== undefined && editID !== prevEditID) {
			setPrevEditID(editID);
			formConfig.columns.map((column) => {
				if (column.type === "select") {
					if (column.select?.setSelected) column.select.setSelected(formConfig.formikConfig.initialValues[column.key]);
					if (column.select?.setSelectedItems) column.select.setSelectedItems(formConfig.formikConfig.initialValues[column.key]);
				}
			});
			formik.setValues(formConfig.formikConfig.initialValues);
		}
	}, [editReload]);

	const [errors, setErrors] = useState<any>({});
	const [isTriedToSubmit, setIsTriedToSubmit] = useState(false);

	useEffect(() => {
		if (isTriedToSubmit) setErrors(formik.errors);
	}, [formik.errors, isTriedToSubmit]);

	// * przy zmianie formularza resetujemy wartości
	useEffect(() => {
		if (editID === undefined) formik.setValues(formConfig.formikConfig.initialValues);
		formik.setTouched({});
		formik.setErrors({});
		formik.setSubmitting(false);
		formik.setStatus(undefined);
		setErrors({});
		setIsTriedToSubmit(false);
	}, [formConfig.formikConfig]);

	// * wywołuje submit formularza resetuje wartości i zamyka okno
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setIsTriedToSubmit(true);
			if (!formik.isValid) return;
			await formik.submitForm();
			formConfig.columns.forEach((column) => {
				if (column.type === "select") {
					if (column.select?.setSelected) column.select.setSelected("");
					if (column.select?.setSelectedItems) column.select.setSelectedItems([""]);
				}
			});
			setIsTriedToSubmit(false);
			onCreated();
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title" textAlign={"center"}>
				{formConfig.title}
			</DialogTitle>
			<DialogContent>
				<Stack spacing={3} p={"10px 0"} minWidth={minWidth ?? "450px"}>
					{formConfig.columns.map((column) =>
						column.type === "select" ? (
							<Box key={column.key} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"20px"}>
								<Box display={"grid"} justifyContent={"center"} gap={"40px"} gridTemplateColumns={"1fr 1fr"}>
									<Button
										variant="contained"
										color="success"
										onClick={() => {
											column.create?.setOpen(true);
										}}
									>
										{column.label}
									</Button>
									<Button variant="contained" color="warning" onClick={() => column.select?.setOpen(true)}>
										{column.select?.title}
									</Button>
								</Box>
								<TextField
									fullWidth
									error={errors[column.key] ? true : false}
									helperText={errors[column.key] ?? ""}
									label={column.required ? column.label + " *" : column.label}
									name={column.key}
									type={column.type}
									disabled={true}
									value={
										column.key === "items"
											? "Wybranych elementów: " +
											  (formik.values[column.key]?.length ? formik.values[column.key]?.length + newItems.length : 0)
											: formik.values[column.key] !== undefined
											? formik.values[column.key]
											: ""
									}
								/>
								{column.key === "items" ? (
									<DialogComponent
										api={api}
										open={column.create?.open ?? false}
										onClose={() => column.create?.setOpen(false)}
										formConfig={column.create?.createFormConfig!}
										onCreated={() => {
											column.create?.onCreated();
										}}
										onItemsCreated={(items) => {
											setNewItems([...newItems, items]);
										}}
										minWidth="350px"
										isLoading={isLoading}
										navigation={navigation}
									/>
								) : (
									<DialogComponent
										api={api}
										open={column.create?.open ?? false}
										onClose={() => column.create?.setOpen(false)}
										formConfig={column.create?.createFormConfig!}
										onCreated={() => {
											column.create?.onCreated();
										}}
										minWidth="350px"
										isLoading={isLoading}
										navigation={navigation}
									/>
								)}
								<SelectTable
									open={column.select?.open ?? false}
									onClose={() => column.select?.setOpen(false)}
									title={column.select?.title ?? ""}
									data={column.select?.options ?? []}
									page={column.select?.page ?? 1}
									itemsPerPage={column.select?.itemsPerPage ?? 10}
									itemsPerPageOptions={column.select?.itemsPerPageOptions ?? [10, 25, 50, 100]}
									setItemsPerPage={(value) => column.select?.setItemsPerPage(value)}
									countPage={column.select?.countPage ?? 1}
									onSetPage={(page) => column.select?.setPage(page)}
									selected={column.select?.selected}
									setSelected={(value) => {
										column.select?.setSelected?.(value);
										formik.setFieldValue(column.key, value);
										column.select?.setOpen(false);
										console.log(column.key, value);
									}}
									selectedItems={column.select?.selectedItems}
									setSelectedItems={(value) => {
										column.select?.setSelectedItems?.(value);
										formik.setFieldValue(column.key, value);
									}}
									isLoading={isLoading}
								/>
							</Box>
						) : (
							<TextField
								key={column.key}
								fullWidth
								error={errors[column.key] ? true : false}
								helperText={errors[column.key] ?? ""}
								label={column.required ? column.label + " *" : column.label}
								name={column.key}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type={column.type}
								value={formik.values[column.key] ?? ""}
							/>
						)
					)}
				</Stack>
				<Button fullWidth size="large" sx={{ mt: 3, backgroundColor: "purple.main" }} onClick={handleSubmit} variant="contained">
					Dodaj
				</Button>
			</DialogContent>
		</Dialog>
	);
}
