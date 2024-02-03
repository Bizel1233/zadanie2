import { TableCell } from "@mui/material";

const styledCell = {
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
};

interface props {
	data: string;
}

export const TableComponentElementCell = ({ data }: props) => {
	return <TableCell sx={{ maxWidth: "50px", ...styledCell }}>{data}</TableCell>;
};
