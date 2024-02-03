import { useContext } from "react";
import { ApiContext } from "../providers/apiProvider";

export const useApi = () => {
	const apiContext = useContext(ApiContext);
	if (!apiContext) throw new Error("useApi must be used within a ApiProvider");
	if (apiContext.apiClient === null) throw new Error("ApiProvider must be initialized with an apiClient");

	return { api: apiContext.apiClient, setToken: apiContext.setToken };
};
