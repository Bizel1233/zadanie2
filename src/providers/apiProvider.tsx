import { createContext, useEffect, useState } from "react";
import { ApiClient } from "../api";
import { AuthPage } from "../pages/auth";
import { usePopup } from "../hooks/usePopup";

interface ApiClientContextType {
	apiClient: ApiClient | null;
	setToken: (token: string | null) => void;
}

export const ApiContext = createContext<ApiClientContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
	const [token, setToken] = useState<string | null>(null);
	const [apiClient, setApiClient] = useState<ApiClient | null>(null);
	const popup = usePopup();

	// * ustawienie apiClienta na podstawie tokena
	useEffect(() => {
		if (token) {
			setApiClient(
				new ApiClient({
					baseURL: "http://bbcashflow.beyondbytes.co.uk",
					token: token,
					handleUnauthorized: handleUnauthorized,
					handleErrorMessage: handleErrorMessage,
				})
			);
		} else {
			const checkToken = localStorage.getItem("token");
			if (checkToken) {
				setToken(checkToken);
			} else {
				setApiClient(
					new ApiClient({
						baseURL: "http://bbcashflow.beyondbytes.co.uk",
						handleUnauthorized: handleUnauthorized,
						handleErrorMessage: handleErrorMessage,
					})
				);
			}
		}
	}, [token]);

	const handleUnauthorized = () => {
		setToken(null);
		localStorage.removeItem("token");
	};

	const handleErrorMessage = (error: string, type: "error" | "success") => {
		popup.setType(type);
		popup.setMessage(error);
		popup.setOpen(true);
	};

	if (apiClient === null) return null;
	if (!token)
		return (
			<ApiContext.Provider value={{ apiClient, setToken }}>
				<AuthPage />
			</ApiContext.Provider>
		);

	return <ApiContext.Provider value={{ apiClient, setToken }}>{children}</ApiContext.Provider>;
};
