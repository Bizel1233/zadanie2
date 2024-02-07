import { createContext, useContext } from "react";
import { ReferenceArray } from "../../../utils/config/create/formConfig";
import { TableComponentColumn } from "../../table/context";

export const SelectTableComponentContext =
  createContext<SelectTableComponentContextType | null>(null);

export const useSelectTableComponent = () => {
  const ctx = useContext(SelectTableComponentContext);
  if (ctx === null)
    throw new Error(
      "useSelectTableComponent must be used within a SelectTableComponent"
    );
  return ctx;
};

export type SelectTableComponentContextType = {
  onSetPage?: (page: number) => void;
  isLoading: boolean;
  deleteSelected?: (id: string[]) => void;
  selectedItems?: string[] | undefined;
  setSelectedItems?: (value: string[]) => void;
  selected?: string | undefined;
  setSelected?: (value: string) => void;
  onclose: () => void;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  setItemsPerPage: (value: number) => void;

  title: string;
  data: any[];
  column: TableComponentColumn[];
  page: number;
  countPage: number;
};
