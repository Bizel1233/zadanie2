import {
	Alert,
	Box,
	Button,
	Card,
	Checkbox,
	FormControl,
	LinearProgress,
	MenuItem,
	Pagination,
	Select,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { useTableComponent } from "../context";
import { TableComponentElementRow } from "./tableRow";
import { TableComponentElementFilters } from "./filters";
import { TableComponentElementActiveFilters } from "./activeFilters";
import { useEffect, useMemo, useState } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const TableComponentElement = () => {
	const {
		data,
		selected,
		columns,
		onCreate,
		onSetPage,
		countPage,
		isLoading,
		page,
		itemsPerPage,
		itemsPerPageOptions,
		deleteSelected,
		navigation,
		setSelectedFromHome,
		onSetItemsPerPage,
		sort,
		setSort,
	} = useTableComponent();

	useEffect(() => {
		selected.set([]);
	}, [navigation, setSelectedFromHome]);

	const columnTitle = useMemo(() => {
		return columns.map((column, i) => {
			if (!column.sort || !column.sortKey) {
				return (
					<TableCell key={i}>
						<Box display={"flex"} alignItems={"center"} gap={"20px"}>
							<Box>{column.label}</Box>
						</Box>
					</TableCell>
				);
			}

			if (Object.keys(sort ?? {})[0] === column.sortKey) {
				if (sort?.[column.sortKey as string] === "asc") {
					return (
						<TableCell key={i}>
							<Box
								display={"flex"}
								alignItems={"center"}
								gap={"20px"}
								onClick={() => {
									setSort({ [column.sortKey as string]: "desc" });
								}}
							>
								<Box>{column.label}</Box>
								<KeyboardArrowUpIcon sx={{ cursor: "pointer" }} color="primary" />
							</Box>
						</TableCell>
					);
				} else {
					return (
						<TableCell key={i}>
							<Box
								display={"flex"}
								alignItems={"center"}
								gap={"20px"}
								onClick={() => {
									setSort({ [column.sortKey as string]: "asc" });
								}}
							>
								<Box>{column.label}</Box>
								<KeyboardArrowDownIcon sx={{ cursor: "pointer" }} color="primary" />
							</Box>
						</TableCell>
					);
				}
			}

			return (
				<TableCell key={i}>
					<Box
						display={"flex"}
						alignItems={"center"}
						gap={"20px"}
						onClick={() => {
							setSort({ [column.sortKey as string]: "asc" });
						}}
					>
						<Box>{column.label}</Box>
						<SwapVertIcon sx={{ cursor: "pointer" }} color="primary" />
					</Box>
				</TableCell>
			);
		});
	}, [sort, columns]);

	const Element = () => {
		if (isLoading) return <LinearProgress />;
		const count = data.length;
		return (
			<>
				<TableComponentElementActiveFilters />
				<TableComponentElementFilters />
				{count > 0 ? (
					<>
						<Box sx={{ minWidth: 800 }}>
							<Table>
								<TableHead>
									<TableRow>
										{/* <TableCell padding="checkbox">
											<Checkbox
												indeterminate={selectedAll.get === false && selected.get.length > 0}
												checked={selectedAll.get}
												onChange={(event) => {
													selectedAll.set(!selectedAll.get);
												}}
											/>
											</TableCell> */}
										<TableCell />

										{columnTitle}

										<TableCell width={"60px"} />
										<TableCell width={"60px"} />
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((row, index) => (
										<TableComponentElementRow row={row} key={index} />
									))}
								</TableBody>
							</Table>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "20px",
							}}
						>
							<Box display={"flex"} gap={"30px"}>
								<Button
									variant="contained"
									color="error"
									onClick={() => {
										if (selected.get.length > 0) deleteSelected?.(selected.get.map((item) => item.id));
									}}
								>
									Usuń zaznaczone
								</Button>

								<Button
									variant="contained"
									onClick={() => {
										onCreate?.();
									}}
									disabled={navigation === "item" ? true : false}
								>
									Stwórz nowy
								</Button>
							</Box>

							<Box display={"flex"} gap={"30px"} alignItems={"center"}>
								<FormControl sx={{ m: 1, minWidth: 60 }} size="small" variant="outlined">
									<Select value={itemsPerPage} onChange={(e) => onSetItemsPerPage?.(e.target.value as number)}>
										{itemsPerPageOptions.map((item, index) => (
											<MenuItem key={index} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<Pagination
									defaultPage={page ?? 1}
									count={countPage ?? 0}
									variant="outlined"
									color="primary"
									shape="rounded"
									onChange={(e, page) => {
										onSetPage?.(page);
									}}
								/>
							</Box>
						</Box>
					</>
				) : (
					<Box>
						<Alert severity="info" sx={{ mt: 3 }}>
							Brak Danych
						</Alert>
						<Button
						variant="contained"
						onClick={() => {
							onCreate?.();
						}}
						disabled={navigation === "item" ? true : false}
						>
							Stwórz nowy
						</Button>
					</Box>
				)}
			</>
		);
	};
	return (
		<Box>
			<Card sx={{ padding: "50px" }}>
				<Element />
			</Card>
		</Box>
	);
};
