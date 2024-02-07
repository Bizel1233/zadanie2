import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "./useApi";
import { DefaultGetParams } from "../api/types/hydraTemplate";
import { dialogContractorConfig } from "../utils/config/create/contractors";
import { FormConfig, ReferenceArray, itemsPerPageOptions } from "../utils/config/create/formConfig";
import { dialogDocumentTypeConfig } from "../utils/config/create/typeDocument";
import { dialogProductTypeConfig } from "../utils/config/create/typeProduct";
import { dialogProductConfig } from "../utils/config/create/product";
import { dialogUnitOfMeasuresConfig } from "../utils/config/create/unitOfMeasures";
import { dialogItemConfig } from "../utils/config/create/documentItems";
import { dialogDocumentConfig } from "../utils/config/create/documents";
import { useNavigation } from "./useNavigation";
import { useTable } from "./useTable";
import { tableContractorConfig } from "../utils/config/table/contractors";
import { tableTypeProductConfig } from "../utils/config/table/typeProduct";
import { tableProductConfig } from "../utils/config/table/product";
import { tableUnitOfMeasuresConfig } from "../utils/config/table/unitOfMeasures";
import { tableDocumentItemsConfig } from "../utils/config/table/documentItems";
import { tableTypeDocumentConfig } from "../utils/config/table/typeDocument";
import { TableComponentColumn } from "../components/table/context";

export const useAdditionalCreate = () => {
	const { api } = useApi();
	const { currentCategory } = useNavigation();
	const [additionalCreateDialogOpen, setAdditionalCreateDialogOpen] = useState({
		productType: false,
		product: false,
		unitOfMeasure: false,
		contractor: false,
		documentType: false,
		documentItem: false,
	});
	const [refetchAdditionalData, setRefetchAdditionalData] = useState({
		productType: false,
		product: false,
		unitOfMeasure: false,
		contractor: false,
		documentType: false,
		documentItem: false,
	});
	const [firstAdditionalDataFetch, setFirstAdditionalDataFetch] = useState({
		productType: false,
		product: false,
		unitOfMeasure: false,
		contractor: false,
		documentType: false,
		documentItem: false,
	});
	const [firstSelectFetch, setFirstSelectFetch] = useState({
		product: true,
		documentItem: true,
		document: true,
	});
	const [additionalSelectOpen, setAdditionalSelectOpen] = useState({
		productType: false,
		product: false,
		unitOfMeasure: false,
		contractor: false,
		documentType: false,
		documentItem: false,
	});
	const [itemsPerPage, setItemsPerPage] = useState({
		productType: itemsPerPageOptions[0],
		product: itemsPerPageOptions[0],
		unitOfMeasure: itemsPerPageOptions[0],
		contractor: itemsPerPageOptions[0],
		documentType: itemsPerPageOptions[0],
		documentItem: itemsPerPageOptions[0],
	});
	const [page, setPage] = useState({
		productType: 1,
		product: 1,
		unitOfMeasure: 1,
		contractor: 1,
		documentType: 1,
		documentItem: 1,
	});
	const [selectedProductType, setSelectedProductType] = useState<string | undefined>();
	const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
	const [selectedUnitOfMeasure, setSelectedUnitOfMeasure] = useState<string | undefined>();
	const [selectedContractor, setSelectedContractor] = useState<string | undefined>();
	const [selectedDocumentType, setSelectedDocumentType] = useState<string | undefined>();
	const [selectedDocumentItem, setSelectedDocumentItem] = useState<string[]>([]);

	const [selectedProductTypeEdit, setSelectedProductTypeEdit] = useState<string | undefined>();
	const [selectedProductEdit, setSelectedProductEdit] = useState<string | undefined>();
	const [selectedUnitOfMeasureEdit, setSelectedUnitOfMeasureEdit] = useState<string | undefined>();
	const [selectedContractorEdit, setSelectedContractorEdit] = useState<string | undefined>();
	const [selectedDocumentTypeEdit, setSelectedDocumentTypeEdit] = useState<string | undefined>();
	const [selectedDocumentItemEdit, setSelectedDocumentItemEdit] = useState<string[]>([]);

	const myNewColumn: TableComponentColumn = { label: "@ID", key: "@id", type: "string" };

	// * resetowanie stanów po zmianie kategorii
	useEffect(() => {
		setSelectedContractor(undefined);
		setSelectedDocumentType(undefined);
		setSelectedDocumentItem([]);
		setSelectedProduct(undefined);
		setSelectedProductType(undefined);
		setSelectedUnitOfMeasure(undefined);
		setPage({
			productType: 1,
			product: 1,
			unitOfMeasure: 1,
			contractor: 1,
			documentType: 1,
			documentItem: 1,
		});
	}, [currentCategory]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami typu produkt
	const handleAdditionalCreateProductTypeArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.productType,
			page: page.productType,
		};
		
		if (!firstAdditionalDataFetch.productType) return;
		
		const data = await tableTypeProductConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableTypeProductConfig.columns();
		return {data: members, count: count, column: column}
	}, [refetchAdditionalData.productType, firstAdditionalDataFetch.productType, itemsPerPage.productType, page.productType]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami produktów
	const handleAdditionalCreateProductArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.product,
			page: page.product,
		};
		if (!firstAdditionalDataFetch.product) return;

		const data = await tableProductConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableProductConfig.columns();
		return {data: members, count: count, column: column}
	}, [refetchAdditionalData.product, firstAdditionalDataFetch.product, itemsPerPage.product, page.product]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami jednostek miary
	const handleAdditionalUnitOfMeasureArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.unitOfMeasure,
			page: page.unitOfMeasure,
		};
		if (!firstAdditionalDataFetch.unitOfMeasure) return;

		const data = await tableUnitOfMeasuresConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableUnitOfMeasuresConfig.columns();
		return {data: members, count: count, column: column}
	}, [
		refetchAdditionalData.unitOfMeasure,
		firstAdditionalDataFetch.unitOfMeasure,
		itemsPerPage.unitOfMeasure,
		page.unitOfMeasure,
	]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami document item
	const handleAdditionalCreateItemArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.documentItem,
			page: page.documentItem,
		};
		if (!firstAdditionalDataFetch.documentItem) return;

		const data = await tableDocumentItemsConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableDocumentItemsConfig.columns();
		return {data: members, count: count, column: column}
	}, [
		refetchAdditionalData.documentItem,
		firstAdditionalDataFetch.documentItem,
		itemsPerPage.documentItem,
		page.documentItem,
	]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami kontrahent
	const handleAdditionalCreateContractorArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.contractor,
			page: page.contractor,
		};
		if (!firstAdditionalDataFetch.contractor) return;

		const data = await tableContractorConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableContractorConfig.columns();
		return {data: members, count: count, column: column}
	}, [refetchAdditionalData.contractor, firstAdditionalDataFetch.contractor, itemsPerPage.contractor, page.contractor]);

	// * funkcja zwracająca dane do tabeli z dodatkowymi selectami typów dokumentu
	const handleAdditionalCreateDocumentTypeArray = useMemo(async () => {
		const additionalDefaultParams: DefaultGetParams = {
			itemsPerPage: itemsPerPage.documentType,
			page: page.documentType,
		};
		if (!firstAdditionalDataFetch.documentType) return;

		const data = await tableTypeDocumentConfig.getData(api, additionalDefaultParams);
		const members = data["hydra:member"];
		const count = data["hydra:totalItems"];
		const column = tableTypeDocumentConfig.columns();
		return {data: members, count: count, column: column}
	}, [
		refetchAdditionalData.documentType,
		firstAdditionalDataFetch.documentType,
		itemsPerPage.documentType,
		page.documentType,
	]); 

	// * funkcja zwracająca dane konfiguracji formularza produktu do tworzenia oraz edycji
	const handleAdditionalCreateProduct = useCallback(
		async (formikConfigProps?: FormConfig) => {
			if (!firstAdditionalDataFetch.productType) setFirstAdditionalDataFetch((prev) => ({ ...prev, productType: true }));
			const productType = await handleAdditionalCreateProductTypeArray;
			const productTypeCountPage = productType ? Math.ceil(productType.count / itemsPerPage.productType) : 0;

			let defaultValue = dialogProductConfig;
			// * jeżeli formikConfigProps istnieje to znaczy że jest to edycja
			if (formikConfigProps) {
				defaultValue = formikConfigProps;

				// * jeżeli jest to pierwsze pobranie danych to ustawiamy wartości formularza na te z formikConfigProps
				if (firstSelectFetch.product) {
					setFirstSelectFetch((prev) => ({ ...prev, product: false }));
					setSelectedProductTypeEdit(defaultValue.formikConfig.initialValues.type);
				}
			}

			return {
				...defaultValue,
				columns: dialogProductConfig.columns.map((column) => {
					if (column.key === "type") {
						return {
							...column,
							select: {
								data: productType?.data ?? [],
								column: productType?.column ?? [myNewColumn],
								open: additionalSelectOpen.productType,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, productType: value }));
								},
								title: "Wybierz typ produktu",
								page: page.productType,
								itemsPerPage: itemsPerPage.productType,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: productTypeCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, productType: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, productType: value }));
									setPage((prev) => ({ ...prev, productType: 1 }));
								},
								setSelected: (value: string) => {
									formikConfigProps ? setSelectedProductTypeEdit(value) : setSelectedProductType(value);
								},
								selected: formikConfigProps ? selectedProductTypeEdit : selectedProductType,
							},
							create: {
								createFormConfig: dialogProductTypeConfig,
								open: additionalCreateDialogOpen.productType,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, productType: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, productType: !prev.productType }));
								},
							},
						};
					}
					return column;
				}),
			};
		},
		[
			additionalCreateDialogOpen.productType,
			additionalSelectOpen.productType,
			itemsPerPage.productType,
			page.productType,
			selectedProductType,
			selectedProductTypeEdit,
		]
	);

	const handleAdditionalCreateItem = useCallback(
		async (formikConfigProps?: FormConfig) => {
			if (!firstAdditionalDataFetch.product) setFirstAdditionalDataFetch((prev) => ({ ...prev, product: true }));
			if (!firstAdditionalDataFetch.unitOfMeasure) setFirstAdditionalDataFetch((prev) => ({ ...prev, unitOfMeasure: true }));
			const product = await handleAdditionalCreateProductArray;
			const productCountPage = product ? Math.ceil(product.count / itemsPerPage.product) : 0;
			const unitOfMeasure = await handleAdditionalUnitOfMeasureArray;
			const unitOfMeasureCountPage = unitOfMeasure ? Math.ceil(unitOfMeasure.count / itemsPerPage.unitOfMeasure) : 0;
			const additionalProduct = await handleAdditionalCreateProduct();

			let defaultValue = dialogItemConfig;
			// * jeżeli formikConfigProps istnieje to znaczy że jest to edycja
			if (formikConfigProps) {
				defaultValue = formikConfigProps;

				// * jeżeli jest to pierwsze pobranie danych to ustawiamy wartości formularza na te z formikConfigProps
				if (firstSelectFetch.documentItem) {
					setFirstSelectFetch((prev) => ({ ...prev, documentItem: false }));
					setSelectedProductEdit(defaultValue.formikConfig.initialValues.product);
					setSelectedUnitOfMeasureEdit(defaultValue.formikConfig.initialValues.unitOfMeasure);
				}
			}

			return {
				// ...dialogItemConfig,
				...defaultValue,
				columns: dialogItemConfig.columns.map((column) => {
					if (column.key === "product") {
						return {
							...column,
							select: {
								data: product?.data ?? [],
								column: product?.column ?? [myNewColumn],
								open: additionalSelectOpen.product,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, product: value }));
								},
								title: "Wybierz produkt",
								page: page.product,
								itemsPerPage: itemsPerPage.product,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: productCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, product: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, product: value }));
									setPage((prev) => ({ ...prev, product: 1 }));
								},
								setSelected: (value: string) => {
									formikConfigProps ? setSelectedProductEdit(value) : setSelectedProduct(value);
								},
								selected: formikConfigProps ? selectedProductEdit : selectedProduct,
							},
							create: {
								createFormConfig: {
									...additionalProduct,
								},
								open: additionalCreateDialogOpen.product,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, product: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, product: !prev.product }));
								},
							},
						};
					}

					if (column.key === "unitOfMeasure") {
						return {
							...column,
							select: {
								data: unitOfMeasure?.data ?? [],
								column: unitOfMeasure?.column ?? [myNewColumn],
								open: additionalSelectOpen.unitOfMeasure,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, unitOfMeasure: value }));
								},
								title: "Wybierz jednostkę miary",
								page: page.unitOfMeasure,
								itemsPerPage: itemsPerPage.unitOfMeasure,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: unitOfMeasureCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, unitOfMeasure: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, unitOfMeasure: value }));
									setPage((prev) => ({ ...prev, unitOfMeasure: 1 }));
								},
								setSelected: (value: string) => {
									formikConfigProps ? setSelectedUnitOfMeasureEdit(value) : setSelectedUnitOfMeasure(value);
								},
								selected: formikConfigProps ? selectedUnitOfMeasureEdit : selectedUnitOfMeasure,
							},
							create: {
								createFormConfig: dialogUnitOfMeasuresConfig,
								open: additionalCreateDialogOpen.unitOfMeasure,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, unitOfMeasure: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, unitOfMeasure: !prev.unitOfMeasure }));
								},
							},
						};
					}
					return column;
				}),
			};
		},
		[
			additionalCreateDialogOpen.product,
			additionalCreateDialogOpen.unitOfMeasure,
			additionalCreateDialogOpen.productType,
			additionalSelectOpen.product,
			additionalSelectOpen.unitOfMeasure,
			additionalSelectOpen.productType,
			itemsPerPage.product,
			itemsPerPage.unitOfMeasure,
			itemsPerPage.productType,
			page.product,
			page.unitOfMeasure,
			page.productType,
			selectedProduct,
			selectedUnitOfMeasure,
			selectedProductType,
			selectedProductEdit,
			selectedUnitOfMeasureEdit,
			selectedProductTypeEdit,
		]
	);

	const handleAdditionalCreateDocument = useCallback(
		async (formikConfigProps?: FormConfig) => {
			if (!firstAdditionalDataFetch.contractor) setFirstAdditionalDataFetch((prev) => ({ ...prev, contractor: true }));
			if (!firstAdditionalDataFetch.documentType) setFirstAdditionalDataFetch((prev) => ({ ...prev, documentType: true }));
			if (!firstAdditionalDataFetch.documentItem) setFirstAdditionalDataFetch((prev) => ({ ...prev, documentItem: true }));

			const itemArray = await handleAdditionalCreateItemArray;
			const itemCountPage = itemArray ? Math.ceil(itemArray.count / itemsPerPage.documentItem) : 0;
			const contractorArray = await handleAdditionalCreateContractorArray;
			const contractorCountPage = contractorArray ? Math.ceil(contractorArray.count / itemsPerPage.contractor) : 0;
			const documentTypeArray = await handleAdditionalCreateDocumentTypeArray;
			const documentTypeCountPage = documentTypeArray ? Math.ceil(documentTypeArray.count / itemsPerPage.documentType) : 0;
			const item = await handleAdditionalCreateItem();

			let defaultValue = dialogDocumentConfig;
			// * jeżeli formikConfigProps istnieje to znaczy że jest to edycja
			if (formikConfigProps) {
				defaultValue = formikConfigProps;
				// * jeżeli jest to pierwsze pobranie danych to ustawiamy wartości formularza na te z formikConfigProps
				if (firstSelectFetch.document) {
					setSelectedContractorEdit(defaultValue.formikConfig.initialValues.contractor);
					setSelectedDocumentTypeEdit(defaultValue.formikConfig.initialValues.type);
					setSelectedDocumentItemEdit(defaultValue.formikConfig.initialValues.items);
					setFirstSelectFetch((prev) => ({ ...prev, document: false }));
				}
			}

			return {
				...defaultValue,
				columns: dialogDocumentConfig.columns.map((column) => {
					if (column.key === "contractor") {
						return {
							...column,
							select: {
								data: contractorArray?.data ?? [],
								column: contractorArray?.column ?? [myNewColumn],
								open: additionalSelectOpen.contractor,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, contractor: value }));
								},
								title: "Wybierz kontrahenta",
								page: page.contractor,
								itemsPerPage: itemsPerPage.contractor,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: contractorCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, contractor: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, contractor: value }));
									setPage((prev) => ({ ...prev, contractor: 1 }));
								},
								setSelected: (value: string) => {
									formikConfigProps ? setSelectedContractorEdit(value) : setSelectedContractor(value);
								},
								selected: formikConfigProps ? selectedContractorEdit : selectedContractor,
							},
							create: {
								createFormConfig: dialogContractorConfig,
								open: additionalCreateDialogOpen.contractor,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, contractor: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, contractor: !prev.contractor }));
								},
							},
						};
					}

					if (column.key === "type") {
						return {
							...column,
							select: {
								data: documentTypeArray?.data ?? [],
								column: documentTypeArray?.column ?? [myNewColumn],
								open: additionalSelectOpen.documentType,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, documentType: value }));
								},
								title: "Wybierz typ dokumentu",
								page: page.documentType,
								itemsPerPage: itemsPerPage.documentType,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: documentTypeCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, documentType: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, documentType: value }));
									setPage((prev) => ({ ...prev, documentType: 1 }));
								},
								setSelected: (value: string) => {
									formikConfigProps ? setSelectedDocumentTypeEdit(value) : setSelectedDocumentType(value);
								},
								selected: formikConfigProps ? selectedDocumentTypeEdit : selectedDocumentType,
							},
							create: {
								createFormConfig: dialogDocumentTypeConfig,
								open: additionalCreateDialogOpen.documentType,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, documentType: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, documentType: !prev.documentType }));
								},
							},
						};
					}

					if (column.key === "items") {
						return {
							...column,
							select: {
								data: itemArray?.data ?? [],
								column: itemArray?.column ?? [myNewColumn],
								open: additionalSelectOpen.documentItem,
								setOpen: (value: boolean) => {
									setAdditionalSelectOpen((prev) => ({ ...prev, documentItem: value }));
								},
								title: "Wybierz pozycję dokumentu",
								page: page.documentItem,
								itemsPerPage: itemsPerPage.documentItem,
								itemsPerPageOptions: itemsPerPageOptions,
								countPage: itemCountPage,
								setPage: (value: number) => {
									setPage((prev) => ({ ...prev, documentItem: value }));
								},
								setItemsPerPage: (value: number) => {
									setItemsPerPage((prev) => ({ ...prev, documentItem: value }));
									setPage((prev) => ({ ...prev, documentItem: 1 }));
								},
								setSelectedItems: (value: string[]) => {
									formikConfigProps ? setSelectedDocumentItemEdit(value) : setSelectedDocumentItem(value);
								},
								selectedItems: formikConfigProps ? selectedDocumentItemEdit : selectedDocumentItem,
							},
							create: {
								createFormConfig: {
									...item,
								},
								open: additionalCreateDialogOpen.documentItem,
								setOpen: (value: boolean) => {
									setAdditionalCreateDialogOpen((prev) => ({ ...prev, documentItem: value }));
								},
								onCreated: () => {
									setRefetchAdditionalData((prev) => ({ ...prev, documentItem: !prev.documentItem }));
								},
							},
						};
					}
					return column;
				}),
			};
		},
		[
			additionalCreateDialogOpen,
			additionalSelectOpen,
			page,
			itemsPerPage,
			selectedContractor,
			selectedDocumentType,
			selectedDocumentItem,
			selectedProduct,
			selectedProductType,
			selectedUnitOfMeasure,
			selectedContractorEdit,
			selectedDocumentTypeEdit,
			selectedDocumentItemEdit,
			selectedProductEdit,
			selectedProductTypeEdit,
			selectedUnitOfMeasureEdit,
		]
	);

	return {
		handleAdditionalCreateProduct,
		handleAdditionalCreateItem,
		handleAdditionalCreateDocument,
		additionalCreateDialogOpen,
		setAdditionalCreateDialogOpen,
		refetchAdditionalData,
		setRefetchAdditionalData,
		firstAdditionalDataFetch,
		setFirstAdditionalDataFetch,
		additionalSelectOpen,
		itemsPerPage,
		page,
		selectedContractor,
		selectedDocumentType,
		selectedDocumentItem,
		selectedProduct,
		selectedProductType,
		selectedUnitOfMeasure,
		selectedContractorEdit,
		selectedDocumentTypeEdit,
		selectedDocumentItemEdit,
		selectedProductEdit,
		selectedProductTypeEdit,
		selectedUnitOfMeasureEdit,
	};
};
