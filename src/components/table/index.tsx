import { useState } from "react";
import { TableComponentActiveFilter, TableComponentColumn, TableComponentContext } from "./context";
import { TableComponentElement } from "./elements/table";
import { positionKeys } from "../navigation";
import { SortTemplate } from "../../utils/config/table/tableConfig";

interface props {
	data: any;
	columns: TableComponentColumn[];
	activeFilters?: TableComponentActiveFilter[];
	countPage: number;
	page: number;
	itemsPerPage: number;
	itemsPerPageOptions: number[];
	isLoading?: boolean;
	navigation: positionKeys | null;
	setSelectedFromHome: boolean;
	onChangeFilters?: (data: TableComponentActiveFilter[]) => void;
	onCreate?: () => void;
	onSetPage?: (page: number) => void;
	onSetItemsPerPage?: (count: number) => void;
	deleteSelected?: (id: string[]) => void;
	onEdit: (id: string) => void;
	sort?: SortTemplate;
	setSort: (sort: SortTemplate) => void;
}

export const TableComponent = ({
	data,
	columns,
	activeFilters,
	onChangeFilters,
	onCreate,
	onSetPage,
	countPage,
	page,
	itemsPerPage,
	itemsPerPageOptions,
	isLoading,
	navigation,
	deleteSelected,
	setSelectedFromHome,
	onEdit,
	onSetItemsPerPage,
	setSort,
	sort,
}: props) => {
	const [selected, setSelected] = useState<any[]>([]);

	return (
		<TableComponentContext.Provider
			value={{
				columns: columns,
				data: data,
				selected: { get: selected, set: setSelected },
				activeFilters: activeFilters,
				onChangeFilters: onChangeFilters,
				page: page,
				itemsPerPage,
				itemsPerPageOptions,
				onCreate: onCreate,
				onSetPage: onSetPage,
				countPage: countPage,
				navigation: navigation,
				isLoading: isLoading ?? false,
				deleteSelected: deleteSelected,
				setSelectedFromHome: setSelectedFromHome,
				onEdit: onEdit,
				onSetItemsPerPage,
				setSort: setSort,
				sort: sort,
			}}
		>
			<TableComponentElement />
		</TableComponentContext.Provider>
	);
};
