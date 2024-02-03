import { Navigation, positionKeys } from "./components/navigation";
import HomePage from "./pages/home";
import { Alert, Box, Snackbar } from "@mui/material";
import { configNavPositions } from "./utils/config/navPositions";
import { useNavigation } from "./hooks/useNavigation";
import { useCallback, useEffect } from "react";
import { usePopup } from "./hooks/usePopup";

const App = () => {
	const nav = useNavigation();
	const popup = usePopup();

	const handleChangeNav = useCallback((key: positionKeys) => {
		nav.changeCategory(key);
	}, []);

	return (
		<Box>
			<Navigation
				onChange={(e) => {
					handleChangeNav(e);
				}}
				positions={configNavPositions}
			/>
			<HomePage />
			<Snackbar
				open={popup.open}
				onClose={() => popup.setOpen(false)}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={() => popup.setOpen(false)} severity={popup.type} variant="filled" sx={{ width: "100%" }}>
					{popup.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default App;
