import { useEffect, useState } from "react";
import { TableComponentColumn } from "../components/table/context";

export const useTable = (columns: TableComponentColumn[]) => {
	const [countPage, setCountPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<any[] | null>(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (data != null) {
			setIsLoading(false);
		}
	}, [data]);

	return {
		countPage,
		setCountPage,
		onSetPage: (e: number) => {
			// setCountPage(e);
		},
		data: data ?? [],
		page: page,
		setPage: setPage,
		columns,
		isLoading,
		setData: setData,
		setIsLoading: setIsLoading,
	};
};
