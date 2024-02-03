import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface props {
	id: string[];
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
}

// * Popup do usuwania elementów
export default function DeleteDialogComponent({ id, open, onClose, onDelete }: props) {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title" textAlign={"center"}>
				Usuń elementy
			</DialogTitle>
			<DialogContent>
				<Box textAlign={"center"}>Czy na pewno chcesz usunąć ({id.length}) elementy?</Box>
				<Box display={"flex"} justifyContent={"space-between"} gap={"40px"}>
					<Button
						fullWidth
						size="large"
						sx={{ mt: 3, backgroundColor: "purple.main" }}
						variant="contained"
						onClick={() => onClose()}
					>
						Anuluj
					</Button>
					<Button fullWidth size="large" sx={{ mt: 3 }} variant="contained" color="error" onClick={onDelete}>
						Usuń
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
