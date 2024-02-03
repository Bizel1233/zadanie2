import { Box, Button, Menu, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { TableComponentColumn } from "../context";
import { useMemo, useRef, useState } from "react";

const styledCell = {
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
};

interface props {
	data: any;
	column: TableComponentColumn;
}

export const TableComponentElementCell = ({ data, column }: props) => {
	if (column.type === "object") return <AsObject data={data} column={column} />;
	return (
		<TableCell sx={{ maxWidth: "100px", ...styledCell }}>
			{column.onGoto ? <Button>{data?.[column.key]}</Button> : data?.[column.key]}
		</TableCell>
	);
};

// * komponent do wyświetlania obiektów w tabeli
function AsObject({ data, column }: props) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);

	// * zwraca ilość elementów w tablicy jako gotowy string do wyświetlenia
	const defaultField = useMemo(() => {
		if (Array.isArray(data?.[column.key])) return `${column.label}: ${data?.[column.key]?.length}`;
		const tmp = column.additionalObjectDisplay?.find((x) => x.default);
		const prepared = data?.[column.key]?.[tmp?.key ?? ""];
		if (prepared == null) return "";
		return prepared;
	}, [data, column]);

	// * zwraca elementy do wyświetlenia w menu (produkty w dokumentach)
	const ExtendInfo = useMemo(() => {
		const preparedData = data?.[column.key];
		const Element = (preData: any, index?: number) => {
			const keys = column.additionalObjectDisplay;
			if (keys) {
				const tmp = keys.map((key, i) => {
					const prepared = preData?.[key.key];
					if (prepared == null) return <Box key={"box" + i}></Box>;
					return (
						<TableRow key={"table" + i}>
							<TableCell>{key.label}:</TableCell>
							<TableCell>{prepared}</TableCell>
						</TableRow>
					);
				});
				if (column.onGoto != null) {
					tmp.push(
						<Button disableRipple fullWidth sx={{ borderRadius: "0px" }}>
							Przejdź
						</Button>
					);
				} else {
					if (Array.isArray(preparedData))
						if ((index ?? 0) < preparedData.length - 1)
							tmp.push(
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							);
				}
				return tmp;
			}
		};
		if (Array.isArray(preparedData))
			return preparedData.map((x, i) => {
				return Element(x, i);
			});
		return Element(preparedData);
	}, []);

	return (
		<TableCell sx={{ maxWidth: "100px", ...styledCell }}>
			<Button
				ref={buttonRef}
				onClick={() => {
					if (data?.[column.key]?.length > 0) setOpen(!open);
				}}
			>
				{defaultField}
			</Button>
			<Menu
				anchorEl={buttonRef.current}
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<Table>
					<TableBody>{ExtendInfo}</TableBody>
				</Table>
			</Menu>
		</TableCell>
	);
}
