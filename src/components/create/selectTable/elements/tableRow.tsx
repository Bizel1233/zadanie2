import { Checkbox, Radio, TableCell, TableRow } from "@mui/material";
import { useSelectTableComponent } from "../context";
import { ReferenceArray } from "../../../../utils/config/create/formConfig";
import { TableComponentElementCell } from "../../../table/elements/tableCell";

interface newReferenceArray {
  "@id": string;

  [key: string]: any;
}

interface props {
  row: newReferenceArray;
}

export const TableComponentElementRow = ({ row }: props) => {
  const { selected, setSelected, setSelectedItems, selectedItems, column } =
    useSelectTableComponent();

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        {selectedItems !== undefined && setSelectedItems !== undefined ? (
          <Checkbox
            checked={selectedItems.includes(row["@id"]) ? true : false}
            onChange={() => {
              if (selectedItems.includes(row["@id"])) {
                setSelectedItems(
                  selectedItems.filter((item) => item !== row["@id"])
                );
              } else {
                setSelectedItems([...selectedItems, row["@id"]]);
              }
            }}
          />
        ) : setSelected !== undefined ? (
          <Radio
            checked={selected === row["@id"] ? true : false}
            onChange={() => {
              setSelected(row["@id"]);
            }}
          />
        ) : (
          ""
        )}
      </TableCell>
      {/* <TableComponentElementCell data={row["@id"]} />
			<TableComponentElementCell data={row.name} /> */}

      {column.map((col, i) => (
        <TableComponentElementCell key={i} data={row} column={col} />
      ))}
    </TableRow>
  );
};
