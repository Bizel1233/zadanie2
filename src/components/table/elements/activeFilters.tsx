import { Box, Chip } from "@mui/material";
import { useTableComponent } from "../context";

interface props {}

export const TableComponentElementActiveFilters = ({}: props) => {
	const tableData = useTableComponent();
	const activeFilters = tableData.activeFilters;
	if (activeFilters === undefined) return <></>;

	function handleRemoveFilter(key: string) {
		const tmp = [...(activeFilters ?? [])];
		const index = tmp.findIndex((e) => e.key === key);
		tmp.splice(index, 1);
		tableData.onChangeFilters?.(tmp);
	}
	return (
		<Box sx={{ gap: "10px", display: "flex", margin: "10px" }}>
			{activeFilters.map((e, i) => (
				<Chip
					color="primary"
					label={`${e.label}: ${e.value}`}
					key={i}
					onClick={() => {
						handleRemoveFilter(e.key);
					}}
					onDelete={() => {
						handleRemoveFilter(e.key);
					}}
				/>
			))}
		</Box>
	);
};
