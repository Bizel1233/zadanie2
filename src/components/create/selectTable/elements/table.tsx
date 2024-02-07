import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelectTableComponent } from "../context";
import { TableComponentElementRow } from "./tableRow";

export const SelectTableComponentElement = () => {
  const {
    data,
    column,
    onSetPage,
    countPage,
    isLoading,
    page,
    onclose,
    itemsPerPage,
    itemsPerPageOptions,
    setItemsPerPage,
  } = useSelectTableComponent();

  const Element = () => {
    if (isLoading) return <LinearProgress />;
    const count = data.length;
    return (
      <>
        {count > 0 ? (
          <>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {/* <TableCell width={"250px"}>Identyfikator</TableCell>
                    <TableCell>Nazwa</TableCell> */}
                    {column.map((col, i) => (
                      <TableCell key={col.key}>{col.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableComponentElementRow row={row} key={index} />
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => onclose()}
              >
                Zamknij
              </Button>
              <Box display={"flex"} gap={"30px"} alignItems={"center"}>
                <FormControl
                  sx={{ m: 1, minWidth: 60 }}
                  size="small"
                  variant="outlined"
                >
                  <Select
                    value={itemsPerPage ?? ""}
                    onChange={(e) =>
                      setItemsPerPage?.(e.target.value as number)
                    }
                  >
                    {itemsPerPageOptions.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Pagination
                  defaultPage={page ?? 1}
                  count={countPage ?? 0}
                  variant="outlined"
                  color="primary"
                  shape="rounded"
                  onChange={(e, page) => {
                    onSetPage?.(page);
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Alert severity="info" sx={{ mt: 3 }}>
            Brak Danych
          </Alert>
        )}
      </>
    );
  };
  return (
    <Box>
      <Card sx={{ padding: "50px" }}>
        <Element />
      </Card>
    </Box>
  );
};
