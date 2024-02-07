import { Checkbox, Radio, TableCell, TableRow } from "@mui/material";
import { useSelectTableComponent } from "../context";
import { TableComponentElementCell } from "../../../table/elements/tableCell";

interface newReferenceArray {
  "@id": string;
  name: string;
  [key: string]: any;
}

interface props {
  row: newReferenceArray;
}

export const TableComponentElementRow = ({ row }: props) => {
  const {
    selected,
    setSelected,
    setNameSelected,
    setSelectedItems,
    selectedItems,
    column,
  } = useSelectTableComponent();

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
              setNameSelected?.(row.name);
            }}
          />
        ) : (
          ""
        )}
      </TableCell>
      {column.map((col, i) => (
        <TableComponentElementCell key={i} data={row} column={col} />
      ))}
    </TableRow>
  );
};
