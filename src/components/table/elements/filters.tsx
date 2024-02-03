import { Box, Button, Menu, TextField } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { TableComponentColumn, useTableComponent } from "../context";
import { useFormik } from "formik";

interface props {}

export const TableComponentElementFilters = ({}: props) => {
	const tableData = useTableComponent();

	const filterColumns = useMemo(() => {
		return tableData.columns.filter((column) => column.filter);
	}, [tableData.columns]);

	function getInitialValues() {
		const tmp: any = {};
		tableData.columns.forEach((column) => {
			if (column.filter) tmp[column.key] = "";
		});
		return tmp;
	}

	const formik = useFormik({
		initialValues: getInitialValues(),
		validateOnChange: false,
		validate: (values) => {},
		onSubmit: async (values, helpers) => {},
	});

	// * wysyła filtry do funkcji onChangeFilters
	function handleSaveFilters() {
		const tmp: any = [];
		Object.keys(formik.values).forEach((key) => {
			tmp.push({
				label: filterColumns.find((x) => x.key === key)?.label ?? "",
				key: key,
				value: formik.values[key],
			});
		});
		tableData.onChangeFilters?.(tmp.filter((x: any) => x.value !== ""));
	}

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);
	return (
		<div>
			<Button
				ref={buttonRef}
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={() => {
					setOpen(true);
				}}
				sx={{ borderRadius: "0px" }}
			>
				Filtry
			</Button>
			<Menu
				anchorEl={buttonRef.current}
				id="basic-menu"
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<Box
					sx={{
						padding: "5px",
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					{filterColumns.map((column, i) => (
						<Element key={i} column={column} formik={formik} />
					))}
					<Button
						variant="contained"
						onClick={() => {
							handleSaveFilters();
							setOpen(false);
						}}
					>
						Zapisz
					</Button>
					<Button
						variant="outlined"
						onClick={() => {
							tableData.onChangeFilters?.([]);
							setOpen(false);
						}}
					>
						Wyczyść
					</Button>
				</Box>
			</Menu>
		</div>
	);
};

function Element(props: { column: TableComponentColumn; formik: any }) {
	const column = props.column;
	const formik = props.formik;
	return (
		<TextField
			size="small"
			label={column.label}
			name={column.key}
			onBlur={formik.handleBlur}
			onChange={formik.handleChange}
			type={column.type}
			value={formik.values?.[column.key]}
		/>
	);
}
