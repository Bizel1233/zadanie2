import { createContext, useContext } from "react";
import { positionKeys } from "../navigation";
import { SortTemplate } from "../../utils/config/table/tableConfig";

export const TableComponentContext = createContext<TableComponentContextType | null>(null);

export interface TableComponentColumn {
	label: string;
	type: "string" | "number" | "date" | "boolean" | "object";
	key: string;
	filter?: boolean;
	order?: boolean;
	sort?: boolean;
	sortKey?: string;
	onGoto?: (data: any) => void;
	additionalObjectDisplay?: {
		label: string;
		key: string;
		default?: boolean;
	}[];
}
export interface TableComponentActiveFilter {
	label: string;
	key: string;
	value: string | string[];
}

export const useTableComponent = () => {
	const ctx = useContext(TableComponentContext);
	if (ctx === null) throw new Error("useTableComponent must be used within a TableComponent");
	return ctx;
};

export type TableComponentContextType = {
	selected: {
		get: any[];
		set: React.Dispatch<React.SetStateAction<any[]>>;
	};
	columns: TableComponentColumn[];
	data: any[];
	countPage: number;
	page: number;
	itemsPerPage: number;
	itemsPerPageOptions: number[];
	activeFilters?: TableComponentActiveFilter[];
	onChangeFilters?: (data: TableComponentActiveFilter[]) => void;
	onCreate?: () => void;
	onSetPage?: (page: number) => void;
	navigation: positionKeys | null;
	isLoading: boolean;
	deleteSelected?: (id: string[]) => void;
	setSelectedFromHome: boolean;
	onEdit: (id: string) => void;
	onSetItemsPerPage?: (count: number) => void;
	setSort: (sort: SortTemplate) => void;
	sort?: SortTemplate;
};
