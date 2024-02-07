import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReferenceArray } from "../../../utils/config/create/formConfig";
import { TableComponentColumn } from "../../table/context";
import { DocumentItemPostBody } from "../../../api/types/documentItem/paramsAndBody";
import { TableComponentElementCell } from "../../table/elements/tableCell";
import DeleteIcon from "@mui/icons-material/Delete";

export const ItemsCreatedColumn: TableComponentColumn[] = [
  { key: "product", type: "string", label: "Id produktu" },
  { label: "Id jednostki miary", key: "unitOfMeasure", type: "string" },
  { label: "Ilość", key: "quantity", type: "string" },
  { label: "Cena Brutto", key: "grossPrice", type: "string" },
  { label: "Rabat", key: "dicountGrossValue", type: "string" },
];

interface props {
  open: boolean;
  onClose: () => void;
  title: string;
  data: DocumentItemPostBody[];
  onRemove: (item: DocumentItemPostBody) => void;
}

export default function NewItemsComponent({
  open,
  onClose,
  title,
  data,
  onRemove,
}: props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle id="alert-dialog-title" textAlign={"center"}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              {ItemsCreatedColumn.map((col, i) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              // <TableComponentElementRow row={row} key={index} />
              <TableRow hover key={index}>
                {ItemsCreatedColumn.map((column, i) => (
                  <TableComponentElementCell
                    key={i}
                    data={row}
                    column={column}
                  />
                ))}
                <TableCell>
                  {/* <Button
                            variant="contained"
                            color="warning"
                            onClick={() => {
                                onEdit(row.id);
                            }}
                        >
                            <EditIcon />
                        </Button> */}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      onRemove(row);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
