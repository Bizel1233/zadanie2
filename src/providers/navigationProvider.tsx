import React, { createContext, useState } from "react";
import { positionKeys } from "../components/navigation";

export const NavigationContext = createContext<NavigationContextProps | null>(null);

interface NavigationContextProps {
	currentCategory: positionKeys | null;
	changeCategory: (newCategory: positionKeys | null) => void;
}

export const NavigationProvider = ({ children }: { children: React.ReactElement }) => {
	const [currentCategory, setCurrentCategory] = useState<positionKeys | null>("contractors");

	const changeCategory = (newCategory: positionKeys | null) => {
		setCurrentCategory(newCategory);
	};

	return <NavigationContext.Provider value={{ currentCategory, changeCategory }}>{children}</NavigationContext.Provider>;
};
