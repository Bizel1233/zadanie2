import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ApiDefaultProps {
	baseURL: string;
	token?: string;
	handleUnauthorized: () => void;
	handleErrorMessage: (message: string, type: "error" | "success") => void;
}

export class ApiDefault {
	private api: AxiosInstance;
	private handleUnauthorized: () => void;
	private handleErrorMessage: (message: string, type: "error" | "success") => void;

	constructor({ baseURL, token, handleUnauthorized, handleErrorMessage }: ApiDefaultProps) {
		this.api = axios.create({
			baseURL,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		this.handleUnauthorized = handleUnauthorized;
		this.handleErrorMessage = handleErrorMessage;
	}

	async get<T>(url: string, params?: object): Promise<T> {
		try {
			const response = await this.api.get<T>(url, { params });
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) this.handleUnauthorized();
			console.log(error);
			this.handleErrorMessage("Wystąpił problem przy pobieraniu", "error");
			// TODO: lepsze rozwiązanie
			return {} as T;
			// throw error;
		}
	}

	async post<T>(url: string, data: object): Promise<T> {
		try {
			const response = await this.api.post<T>(url, data);
			this.handleErrorMessage("Pomyślnie dodano", "success");
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) this.handleUnauthorized();
			console.log(error);
			try {
				if (axios.isAxiosError(error)) this.handleErrorMessage(error.response?.data.violations[0].message, "error");
			} catch (e) {
				this.handleErrorMessage("Wystąpił problem przy dodawaniu", "error");
			}
			// TODO: lepsze rozwiązanie
			return {} as T;
			// throw error;
		}
	}

	async put<T>(url: string, data: object): Promise<T> {
		try {
			const response = await this.api.put<T>(url, data);
			this.handleErrorMessage("Pomyślnie zedytowano", "success");
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) this.handleUnauthorized();
			console.log(error);
			try {
				if (axios.isAxiosError(error)) this.handleErrorMessage(error.response?.data.violations[0].message, "error");
			} catch (e) {
				this.handleErrorMessage("Wystąpił problem przy edycji", "error");
			}
			// TODO: lepsze rozwiązanie
			return {} as T;
			// throw error;
		}
	}

	async patch<T>(url: string, data: object): Promise<T> {
		try {
			const response = await this.api.patch<T>(url, data, { headers: { "Content-Type": "application/merge-patch+json" } });
			this.handleErrorMessage("Pomyślnie zedytowano", "success");
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) this.handleUnauthorized();
			console.log(error);
			try {
				if (axios.isAxiosError(error)) this.handleErrorMessage(error.response?.data.violations[0].message, "error");
			} catch (e) {
				this.handleErrorMessage("Wystąpił problem przy edycji", "error");
			}
			// TODO: lepsze rozwiązanie
			return {} as T;
			// throw error;
		}
	}

	async delete<T>(url: string): Promise<AxiosResponse> {
		try {
			const response = await this.api.delete<T>(url);
			this.handleErrorMessage("Pomyślnie usunięto", "success");
			return response;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) this.handleUnauthorized();
			console.log(error);
			this.handleErrorMessage("Wystąpił problem przy usuwaniu", "error");
			// TODO: lepsze rozwiązanie
			return {} as AxiosResponse;
			// throw error;
		}
	}
}
