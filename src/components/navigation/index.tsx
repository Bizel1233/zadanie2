import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export type positionKeys =
	| "contractors"
	| "documentType"
	| "productType"
	| "product"
	| "unitOfMeasure"
	| "item"
	| "document";

interface props {
	onChange: (key: positionKeys) => void;
	positions: { key: positionKeys; value: string }[];
}

export const Navigation = ({ positions, onChange }: props) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		onChange(positions[newValue].key);
	};
	return (
		<Tabs onChange={handleChange} value={value} centered>
			{positions.map((position) => (
				<Tab
					disableRipple
					sx={{ padding: "5px", ":hover": {}, ":active": {}, ":focus": {} }}
					key={position.key}
					label={position.value}
				/>
			))}
		</Tabs>
	);
};
