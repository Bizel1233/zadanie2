import { Checkbox, Radio, TableCell, TableRow } from "@mui/material";
import { useSelectTableComponent } from "../context";
import { TableComponentElementCell } from "./tableCell";
import { ReferenceArray } from "../../../../utils/config/create/formConfig";

interface props {
	row: ReferenceArray;
}

export const TableComponentElementRow = ({ row }: props) => {
	const { selected, setSelected, setSelectedItems, selectedItems } = useSelectTableComponent();

	return (
		<TableRow hover>
			<TableCell padding="checkbox">
				{selectedItems !== undefined && setSelectedItems !== undefined ? (
					<Checkbox
						checked={selectedItems.includes(row["@id"]) ? true : false}
						onChange={() => {
							if (selectedItems.includes(row["@id"])) {
								setSelectedItems(selectedItems.filter((item) => item !== row["@id"]));
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
			<TableComponentElementCell data={row["@id"]} />
			<TableComponentElementCell data={row.name} />
		</TableRow>
	);
};
