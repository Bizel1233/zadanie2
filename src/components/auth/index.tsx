import { useFormik } from "formik";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

interface props {
	onLogin: (email: string, password: string) => void;
	defaultValues?: {
		email: string;
		password: string;
	};
	error?: string;
}

export const Auth = ({ onLogin, defaultValues, error }: props) => {
	const formik = useFormik({
		initialValues: {
			email: defaultValues?.email ?? "",
			password: defaultValues?.password ?? "",
			submit: null,
		},
		validateOnChange: false,
		validate: (values) => {
			const errors: any = {};
			if (!values.email) {
				errors.email = "Pole wymagane";
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = "Niepoprawny adres E-mail";
			}
			if (!values.password) errors.password = "Pole wymagane";
			return errors;
		},
		onSubmit: async (values, helpers) => {
			onLogin(values.email, values.password);
		},
	});

	return (
		<Box alignContent={"center"} justifyContent={"center"} alignItems={"center"} display={"flex"}>
			<Box maxWidth={550} px={3} py={10} width="100%">
				<div>
					<Stack spacing={1} sx={{ mb: 3 }}>
						<Typography variant="h4" fontWeight={"500"}>
							Zaloguj się
						</Typography>
					</Stack>

					<form noValidate onSubmit={formik.handleSubmit}>
						<Stack spacing={3}>
							<TextField
								error={!!(formik.touched.email && formik.errors.email) || !!error}
								fullWidth
								helperText={formik.touched.email && formik.errors.email}
								label="Adres E-mail"
								name="email"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type="email"
								value={formik.values.email}
							/>
							<TextField
								error={!!(formik.touched.password && formik.errors.password) || !!error}
								fullWidth
								helperText={formik.touched.password && formik.errors.password}
								label="Hasło"
								name="password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type="password"
								value={formik.values.password}
							/>
						</Stack>
						<Typography color="error" sx={{ mt: 1, fontWeight: 500 }}>
							{error ?? ""}
						</Typography>
						<Button fullWidth size="large" sx={{ mt: 3, backgroundColor: "purple.main" }} type="submit" variant="contained">
							Zaloguj
						</Button>
					</form>
				</div>
			</Box>
		</Box>
	);
};
