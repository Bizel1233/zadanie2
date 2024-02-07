import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReferenceArray } from "../../../utils/config/create/formConfig";
import { SelectTableComponentElement } from "./elements/table";
import { SelectTableComponentContext } from "./context";
import { TableComponentColumn } from "../../table/context";

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  column: TableComponentColumn[];
  page: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  countPage: number;
  onSetPage?: (page: number) => void;
  setItemsPerPage: (value: number) => void;
  selected?: string;
  setSelected?: (value: string) => void;
  setNameSelected?: (value: string) => void;
  selectedItems?: string[];
  setSelectedItems?: (value: string[]) => void;
  isLoading?: boolean;
}

export default function SelectTable({
  open,
  onClose,
  title,
  data,
  page,
  itemsPerPage,
  itemsPerPageOptions,
  setItemsPerPage,
  countPage,
  onSetPage,
  selected,
  selectedItems,
  setSelected,
  setSelectedItems,
  setNameSelected,
  isLoading,
  column,
}: props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle id="alert-dialog-title" textAlign={"center"}>
        {title}
      </DialogTitle>
      <DialogContent>
        <SelectTableComponentContext.Provider
          value={{
            title: title,
            data: data,
            column: column,
            page: page,
            itemsPerPage,
            itemsPerPageOptions,
            setItemsPerPage,
            countPage: countPage,
            onSetPage: onSetPage,
            isLoading: isLoading ?? false,
            selected: selected,
            setSelected: setSelected,
            setNameSelected: setNameSelected,
            selectedItems: selectedItems,
            setSelectedItems: setSelectedItems,
            onclose: onClose,
          }}
        >
          <SelectTableComponentElement />
        </SelectTableComponentContext.Provider>
      </DialogContent>
    </Dialog>
  );
}
