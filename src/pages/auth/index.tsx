import { useCallback, useState } from "react";
import { Auth } from "../../components/auth";
import { LoginProps, useAuth } from "../../hooks/useAuth";
import { error } from "console";

export const AuthPage = () => {
	const { login } = useAuth();

	const [error, setError] = useState<string>("");

	const onLogin = useCallback(async (email: string, password: string) => {
		const data: LoginProps = {
			username: email,
			password: password,
		};

		try {
			await login(data);
		} catch (e) {
			setError("Niepoprawne dane logowania");
		}
	}, []);

	return <Auth onLogin={onLogin} error={error} />;
};
