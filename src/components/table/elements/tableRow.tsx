import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useTableComponent } from "../context";
import { TableComponentElementCell } from "./tableCell";
import { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
	row: any;
}

export const TableComponentElementRow = ({ row }: props) => {
	const { columns, selected, page, deleteSelected, onEdit } = useTableComponent();

	function setSelected(value: boolean) {
		const tmp = [...selected.get];
		if (value) {
			if (!tmp.includes(row)) {
				tmp.push(row);
			}
		} else {
			if (tmp.includes(row)) {
				tmp.splice(tmp.indexOf(row), 1);
			}
		}
		selected.set(tmp);
	}

	const getSelected = useMemo(() => {
		const index = selected.get.findIndex((item) => item.id === row.id);
		if (index !== -1) return true;
		return false;
	}, [selected.get, page]);

	return (
		<TableRow hover>
			<TableCell padding="checkbox">
				<Checkbox
					checked={getSelected}
					onChange={(event) => {
						setSelected(event.target.checked);
					}}
				/>
			</TableCell>
			{columns.map((column, i) => (
				<TableComponentElementCell key={i} data={row} column={column} />
			))}
			<TableCell>
				<Button
					variant="contained"
					color="warning"
					onClick={() => {
						onEdit(row.id);
					}}
				>
					<EditIcon />
				</Button>
			</TableCell>
			<TableCell>
				<Button
					variant="contained"
					color="error"
					onClick={() => {
						deleteSelected?.([row.id]);
					}}
				>
					<DeleteIcon />
				</Button>
			</TableCell>
		</TableRow>
	);
};
