import axios from "axios";
import { useApi } from "./useApi";

export interface LoginProps {
	username: string;
	password: string;
}

export const useAuth = () => {
	const { setToken } = useApi();

	async function login(data: LoginProps) {
		const res = await axios.post("http://bbcashflow.beyondbytes.co.uk/authenticate", data);
		if (res.status === 200) {
			setToken(res.data.token);
			window.localStorage.setItem("token", res.data.token);
			window.location.href = "/";
		}
	}

	async function logout() {
		setToken(null);
		window.localStorage.removeItem("token");
	}

	return { login, logout };
};
