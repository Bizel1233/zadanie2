import { Fab } from "@mui/material";
import React from "react";

interface props {
	icon: React.ReactNode;
	ariaLabel: string;
	onClick: () => void;
	color?: "error" | "success" | "info" | "warning";
}

export const FloatButtonComponent = ({ icon, ariaLabel, onClick, color }: props) => {
	return (
		<Fab
			color={color ?? "default"}
			aria-label={ariaLabel}
			onClick={() => {
				onClick();
			}}
			sx={{ margin: "10px" }}
		>
			{icon}
		</Fab>
	);
};
