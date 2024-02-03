import { Box } from "@mui/material";
import { TableComponent } from "../../components/table";
import { useCallback, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigation } from "../../hooks/useNavigation";
import { DefaultGetParams, HydraTemplateGet } from "../../api/types/hydraTemplate";
import { useTable } from "../../hooks/useTable";
import { tableContractorConfig } from "../../utils/config/table/contractors";
import { TableComponentActiveFilter, TableComponentColumn } from "../../components/table/context";
import { tableTypeDocumentConfig } from "../../utils/config/table/typeDocument";
import { tableTypeProductConfig } from "../../utils/config/table/typeProduct";
import { tableProductConfig } from "../../utils/config/table/product";
import { tableDocumentConfig } from "../../utils/config/table/documents";
import { FloatButtonComponent } from "../../components/floatButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/useAuth";
import { tableUnitOfMeasuresConfig } from "../../utils/config/table/unitOfMeasures";
import { tableDocumentItemsConfig } from "../../utils/config/table/documentItems";
import { DictionaryContractorGetParams } from "../../api/types/dictionaryContractor/paramsAndBody";
import { DictionaryDocumentTypeGetParams } from "../../api/types/dictionaryDocumentType/paramsAndBody";
import { DictionaryProductGetParams } from "../../api/types/dictionaryProduct/paramsAndBody";
import { DictionaryProductTypeGetParams } from "../../api/types/dictionaryProductType/paramsAndBody";
import { DictionaryUnitOfMeasureGetParams } from "../../api/types/dictionaryUnitOfMeasure/paramsAndBody";
import { DocumentItemGetParams } from "../../api/types/documentItem/paramsAndBody";
import { DocumentGetParams } from "../../api/types/document/paramsAndBody";
import DialogComponent from "../../components/create";
import { ConstructorKeys, dialogContractorConfig, dialogContractorConfigEdit } from "../../utils/config/create/contractors";
import { FormConfig, itemsPerPageOptions } from "../../utils/config/create/formConfig";
import {
	DocumentTypeKeys,
	dialogDocumentTypeConfig,
	dialogDocumentTypeConfigEdit,
} from "../../utils/config/create/typeDocument";
import {
	ProductTypeKeys,
	dialogProductTypeConfig,
	dialogProductTypeConfigEdit,
} from "../../utils/config/create/typeProduct";
import { ProductKeys, dialogProductConfigEdit } from "../../utils/config/create/product";
import {
	UnitOfMeasureKeys,
	dialogUnitOfMeasuresConfig,
	dialogUnitOfMeasuresConfigEdit,
} from "../../utils/config/create/unitOfMeasures";
import { DocumentItemKeys, dialogItemConfigEdit } from "../../utils/config/create/documentItems";
import { DocumentKeys, dialogDocumentConfigEdit } from "../../utils/config/create/documents";
import DeleteDialogComponent from "../../components/table/delete";
import { OnDeleteSwitch, SortTemplate } from "../../utils/config/table/tableConfig";
import { useAdditionalCreate } from "../../hooks/useAdditionalCreate";
import { DocumentByIdGetResult } from "../../api/types/document/result";

export default function HomePage() {
	const { api } = useApi();
	const auth = useAuth();
	const navigation = useNavigation();
	const additionalCreate = useAdditionalCreate();

	const [config, setConfig] = useState<TableComponentColumn[]>([]);
	const table = useTable(config);

	const [defaultParams, setDefaultParams] = useState<DefaultGetParams>({
		itemsPerPage: itemsPerPageOptions[0],
		page: 1,
	});
	const [activeFilters, setActiveFilters] = useState<TableComponentActiveFilter[]>([]);
	const [sort, setSort] = useState<SortTemplate | undefined>(undefined);

	const [refetchData, setRefetchData] = useState(false);

	const [deleteSelected, setDeleteSelected] = useState<string[]>([]);
	const [deleteSelectedOpen, setDeleteSelectedOpen] = useState(false);
	const [resetDeleteSelected, setResetDeleteSelected] = useState(false);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [createForm, setCreateForm] = useState<FormConfig>(dialogContractorConfig);
	const [createFormIsLoading, setCreateFormIsLoading] = useState(false);

	const [openEdit, setOpenEdit] = useState(false);
	const [editId, setEditId] = useState<string | undefined>(undefined);
	const [editForm, setEditForm] = useState<FormConfig | null>(null);
	const [editReload, setEditReload] = useState(false);

	const setDataForTable = (data: HydraTemplateGet<any>) => {
		if (Object.keys(data).length === 0) return;
		if (data["hydra:view"]["hydra:last"] !== undefined)
			table.setCountPage(Math.ceil(data["hydra:totalItems"] / defaultParams.itemsPerPage));
		else table.setCountPage(0);
		table.setPage(defaultParams.page);
		table.setData(data["hydra:member"]);
	};

	const handleOnChangeFilters = useCallback(
		(data: TableComponentActiveFilter[]) => {
			if (defaultParams.page !== 1) setDefaultParams({ ...defaultParams, page: 1 });
			setActiveFilters(data);
		},
		[activeFilters]
	);

	const handleOnDelete = () => {
		try {
			if (navigation.currentCategory === null) return;
			OnDeleteSwitch(api, deleteSelected, navigation.currentCategory);
			setRefetchData(!refetchData);
		} catch (e) {
			console.log(e);
		}

		setDeleteSelected([]);
		setDeleteSelectedOpen(false);
		setResetDeleteSelected(!resetDeleteSelected);
	};

	useEffect(() => {
		if (activeFilters.length !== 0) setActiveFilters([]);
		if (defaultParams.page !== 1) setDefaultParams({ ...defaultParams, page: 1 });
		if (deleteSelected.length !== 0) setDeleteSelected([]);
		if (editId !== undefined) setEditId(undefined);
		if (editForm !== null) setEditForm(null);
		if (sort !== undefined) setSort(undefined);
	}, [navigation.currentCategory]);

	// * Pobieranie danych do tabeli
	useEffect(() => {
		table.setIsLoading(true);
		switch (navigation.currentCategory) {
			case "contractors":
				setConfig(tableContractorConfig.columns());
				const contractorsParam: DictionaryContractorGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "name" && typeof filter.value === "string") contractorsParam.name = filter.value;
						if (filter.key === "code" && typeof filter.value === "string") contractorsParam.code = filter.value;
					});
				}
				tableContractorConfig.getData(api, contractorsParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "documentType":
				setConfig(tableTypeDocumentConfig.columns());
				const documentTypeParam: DictionaryDocumentTypeGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "name" && typeof filter.value === "string") documentTypeParam.name = filter.value;
						if (filter.key === "code" && typeof filter.value === "string") documentTypeParam.code = filter.value;
					});
				}
				tableTypeDocumentConfig.getData(api, documentTypeParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "productType":
				setConfig(tableTypeProductConfig.columns());
				const productTypeParam: DictionaryProductGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "name" && typeof filter.value === "string") productTypeParam.name = filter.value;
						if (filter.key === "code" && typeof filter.value === "string") productTypeParam.code = filter.value;
					});
				}
				tableTypeProductConfig.getData(api, productTypeParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "product":
				setConfig(tableProductConfig.columns());
				const productParam: DictionaryProductTypeGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "name" && typeof filter.value === "string") productParam.name = filter.value;
						if (filter.key === "code" && typeof filter.value === "string") productParam.code = filter.value;
					});
				}
				tableProductConfig.getData(api, productParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "unitOfMeasure":
				setConfig(tableUnitOfMeasuresConfig.columns());
				const unitOfMeasureParam: DictionaryUnitOfMeasureGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "name" && typeof filter.value === "string") unitOfMeasureParam.name = filter.value;
						if (filter.key === "code" && typeof filter.value === "string") unitOfMeasureParam.code = filter.value;
					});
				}
				tableUnitOfMeasuresConfig.getData(api, unitOfMeasureParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "item":
				setConfig(tableDocumentItemsConfig.columns());
				const itemParam: DocumentItemGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length === 1) {
					if (activeFilters[0].key === "product" && typeof activeFilters[0].value === "string")
						itemParam["product.name"] = activeFilters[0].value;
				}
				tableDocumentItemsConfig.getData(api, itemParam).then((res) => {
					setDataForTable(res);
				});
				break;
			case "document":
				setConfig(tableDocumentConfig.columns());
				let documentParam: DocumentGetParams = { ...defaultParams, ...sort };
				if (activeFilters.length > 0) {
					activeFilters.forEach((filter) => {
						if (filter.key === "number" && typeof filter.value === "string") documentParam.number = filter.value;
						if (filter.key === "contractor" && typeof filter.value === "string") documentParam["contractor.name"] = filter.value;
					});
				}
				tableDocumentConfig.getData(api, documentParam).then((res) => {
					setDataForTable(res);
				});
				break;
		}
	}, [navigation.currentCategory, activeFilters, defaultParams, refetchData, sort]);

	// * Pobieranie danych do formularza tworzenia nowego elementu
	useEffect(() => {
		setCreateFormIsLoading(true);
		const switchFunction = async () => {
			switch (navigation.currentCategory) {
				case "contractors":
					setCreateForm(dialogContractorConfig);
					setCreateFormIsLoading(false);
					break;
				case "documentType":
					setCreateForm(dialogDocumentTypeConfig);
					setCreateFormIsLoading(false);
					break;
				case "productType":
					setCreateForm(dialogProductTypeConfig);
					setCreateFormIsLoading(false);
					break;
				case "product":
					setCreateForm(await additionalCreate.handleAdditionalCreateProduct());
					setCreateFormIsLoading(false);
					break;
				case "unitOfMeasure":
					setCreateForm(dialogUnitOfMeasuresConfig);
					setCreateFormIsLoading(false);
					break;
				case "item":
					setCreateForm(await additionalCreate.handleAdditionalCreateItem());
					setCreateFormIsLoading(false);
					break;
				case "document":
					setCreateForm(await additionalCreate.handleAdditionalCreateDocument());
					setCreateFormIsLoading(false);
					break;
			}
		};
		switchFunction();
	}, [
		navigation.currentCategory,
		activeFilters,
		defaultParams,
		refetchData,
		additionalCreate.additionalCreateDialogOpen,
		additionalCreate.additionalSelectOpen,
		additionalCreate.page,
		additionalCreate.itemsPerPage,
		additionalCreate.selectedContractor,
		additionalCreate.selectedDocumentType,
		additionalCreate.selectedDocumentItem,
		additionalCreate.selectedProduct,
		additionalCreate.selectedProductType,
		additionalCreate.selectedUnitOfMeasure,
	]);

	// * Pobieranie danych do formularza edycji elementu
	useEffect(() => {
		if (!editId) return;
		setCreateFormIsLoading(true);
		const switchFunction = async () => {
			switch (navigation.currentCategory) {
				case "contractors":
					// const contractor = await api.DictionaryContractor.getById(editId);
					const contractor = table.data.findIndex((item) => item.id === editId);
					if (contractor === -1) return;
					const data: ConstructorKeys = {
						name: table.data[contractor].name,
						code: table.data[contractor].code,
						city: table.data[contractor].city,
						address: table.data[contractor].address,
						postcode: table.data[contractor].postcode,
						nip: table.data[contractor].nip,
					};
					setEditForm(dialogContractorConfigEdit(data));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "documentType":
					// const documentType = await api.DictionaryDocumentType.getById(editId);
					const documentType = table.data.findIndex((item) => item.id === editId);
					if (documentType === -1) return;
					const dataDocumentType: DocumentTypeKeys = {
						name: table.data[documentType].name,
						code: table.data[documentType].code,
					};
					setEditForm(dialogDocumentTypeConfigEdit(dataDocumentType));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "productType":
					// const productType = await api.DictionaryProductType.getById(editId);
					const productType = table.data.findIndex((item) => item.id === editId);
					if (productType === -1) return;
					const dataProductType: ProductTypeKeys = {
						name: table.data[productType].name,
						code: table.data[productType].code,
					};
					setEditForm(dialogProductTypeConfigEdit(dataProductType));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "product":
					const product = table.data.findIndex((item) => item.id === editId);
					if (product === -1) return;
					const dataProduct: ProductKeys = {
						name: table.data[product].name,
						code: table.data[product].code,
						type: table.data[product].typeID,
					};
					setEditForm(await additionalCreate.handleAdditionalCreateProduct(dialogProductConfigEdit(dataProduct)));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "unitOfMeasure":
					// const unitOfMeasure = await api.DictionaryUnitOfMeasure.getById(editId);
					const unitOfMeasure = table.data.findIndex((item) => item.id === editId);
					if (unitOfMeasure === -1) return;
					const dataUnitOfMeasure: UnitOfMeasureKeys = {
						name: table.data[unitOfMeasure].name,
						code: table.data[unitOfMeasure].code,
					};
					setEditForm(dialogUnitOfMeasuresConfigEdit(dataUnitOfMeasure));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "item":
					// const item = await api.DocumentItem.getById(editId);
					const item = table.data.findIndex((item) => item.id === editId);
					if (item === -1) return;
					const dataItem: DocumentItemKeys = {
						quantity: table.data[item].quantity,
						grossPrice: table.data[item].grossPrice,
						dicountGrossValue: table.data[item].dicountGrossValue,
						product: table.data[item].productID,
						unitOfMeasure: table.data[item].unitOfMeasureID,
					};
					setEditForm(await additionalCreate.handleAdditionalCreateItem(dialogItemConfigEdit(dataItem)));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
				case "document":
					// const document = await api.Documents.getById(editId);
					const document = table.data.findIndex((item) => item.id === editId);
					if (document === -1) return;
					const dataDocument: DocumentKeys = {
						number: table.data[document].number,
						contractor: table.data[document].contractorID,
						type: table.data[document].typeID,
						items: table.data[document].items?.map((item: DocumentByIdGetResult) => item["@id"]),
					};
					setEditForm(await additionalCreate.handleAdditionalCreateDocument(dialogDocumentConfigEdit(dataDocument)));
					setCreateFormIsLoading(false);
					setEditReload((prev) => !prev);
					break;
			}
		};
		switchFunction();
	}, [
		navigation.currentCategory,
		openEdit,
		editId,
		refetchData,
		additionalCreate.additionalCreateDialogOpen,
		additionalCreate.additionalSelectOpen,
		additionalCreate.page,
		additionalCreate.itemsPerPage,
		additionalCreate.selectedContractorEdit,
		additionalCreate.selectedDocumentTypeEdit,
		additionalCreate.selectedDocumentItemEdit,
		additionalCreate.selectedProductEdit,
		additionalCreate.selectedProductTypeEdit,
		additionalCreate.selectedUnitOfMeasureEdit,
	]);

	return (
		<Box display={"flex"} justifyContent={"center"}>
			<Box width={"1500px"} mt={"50px"} mb={"20px"}>
				<TableComponent
					{...table}
					page={defaultParams.page}
					onChangeFilters={(e) => handleOnChangeFilters(e)}
					activeFilters={activeFilters ?? undefined}
					onCreate={() => {
						setDialogOpen(true);
					}}
					onSetPage={(e) => {
						setDefaultParams({ ...defaultParams, page: e });
					}}
					deleteSelected={(id: string[]) => {
						setDeleteSelected(id);
						setDeleteSelectedOpen(true);
					}}
					navigation={navigation.currentCategory}
					setSelectedFromHome={resetDeleteSelected}
					onEdit={(id: string) => {
						setOpenEdit(true);
						setEditId(id);
					}}
					itemsPerPage={defaultParams.itemsPerPage}
					itemsPerPageOptions={itemsPerPageOptions}
					onSetItemsPerPage={(count: number) => {
						setDefaultParams({ page: 1, itemsPerPage: count });
					}}
					sort={sort}
					setSort={(sort: SortTemplate) => {
						setSort(sort);
					}}
				/>
				<Box position={"fixed"} bottom={"5px"} right={"5px"}>
					<FloatButtonComponent
						onClick={() => {
							auth.logout();
						}}
						ariaLabel="Wyloguj"
						icon={<LogoutIcon />}
						color="error"
					/>
				</Box>
				<DialogComponent
					api={api}
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
					formConfig={createForm}
					onCreated={() => {
						setRefetchData((prev) => !prev);
					}}
					refetch={() => setRefetchData((prev) => !prev)}
					isLoading={createFormIsLoading}
					navigation={navigation.currentCategory ?? "contractors"}
				/>

				{editForm && (
					<DialogComponent
						api={api}
						open={openEdit}
						onClose={() => setOpenEdit(false)}
						// formConfig={editForm}
						formConfig={editForm}
						onCreated={() => {
							setRefetchData((prev) => !prev);
						}}
						refetch={() => setRefetchData((prev) => !prev)}
						isLoading={createFormIsLoading}
						editID={editId}
						editReload={editReload}
						navigation={navigation.currentCategory ?? "contractors"}
					/>
				)}

				<DeleteDialogComponent
					open={deleteSelectedOpen}
					onClose={() => setDeleteSelectedOpen(false)}
					id={deleteSelected}
					onDelete={() => {
						handleOnDelete();
					}}
				/>
			</Box>
		</Box>
	);
}
