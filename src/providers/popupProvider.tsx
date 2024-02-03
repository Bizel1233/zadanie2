import React, { createContext, useState } from "react";

export const PopupContext = createContext<PopupContextProps | null>(null);

interface PopupContextProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	message: string;
	setMessage: (value: string) => void;
	type: "error" | "success";
	setType: (value: "error" | "success") => void;
}

export const PopupProvider = ({ children }: { children: React.ReactElement }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [type, setType] = useState<"error" | "success">("error");
	return (
		<PopupContext.Provider value={{ open, setOpen, message, setMessage, type, setType }}>{children}</PopupContext.Provider>
	);
};
