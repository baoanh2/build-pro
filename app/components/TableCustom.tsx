import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  Paper,
  Pagination,
  Box,
  TableSortLabel,
  SxProps,
  Theme,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

export const violetBase = "#4338CA";
const violetMain = alpha(violetBase, 0.8);

const theme = createTheme({
  palette: {
    secondary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 1),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
  components: {
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#dbd9d9",
          },
          "&.Mui-active": {
            "&&": {
              color: "#dbd9d9",

              "& * ": {
                color: "#dbd9d9",
              },
            },
          },
        },
        icon: {
          color: "#dbd9d9",
        },
      },
    },
  },
});
interface HeadCell {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  sortable: boolean;
  sx?: SxProps<Theme>;
}
interface TableCustomProps {
  dataSource: any[] | undefined;
  headCell: HeadCell[];
  page: number;
  totalPageNumber: number | undefined;
  handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void;
  order: "asc" | "desc";
  orderBy: string;
  onSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const TableCustom: React.FC<TableCustomProps> = ({
  dataSource,
  headCell,
  handlePageChange,
  page,
  totalPageNumber,
  order,
  orderBy,
  onSort,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const createSortHandler =
    (value: string) => (event: React.MouseEvent<unknown>) => {
      onSort(event, value);
    };
  const renderSkeleton = () => {
    const columnNum: any = [];
    for (let i = 1; i < headCell.length; i++) {
      columnNum.push(
        <StyledTableCell align="right" key={i}>
          <Skeleton />
        </StyledTableCell>
      );
    }
    return columnNum;
  };
  useEffect(() => {
    const loadingState = async () => {
      setTimeout(() => setLoading(false), 1000);
    };
    loadingState();
  }, [loading]);
  const skeletonArray = Array(10).fill("");
  return (
    <>
      <div className="w-full mt-7 min-h-screen h-full">
        <ThemeProvider theme={theme}>
          <TableContainer component={Paper}>
            <Table sx={{ borderRadius: "8px", boxShadow: 2 }}>
              <TableHead>
                <TableRow>
                  {headCell.map((headCell) => {
                    return (
                      <StyledTableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ fontSize: 15 }}
                      >
                        {headCell.sortable ? (
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        ) : (
                          headCell.label
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? skeletonArray.map((_, index) => (
                      <TableRow key={index} sx={{ p: 10 }}>
                        <StyledTableCell component="th" scope="row">
                          <Skeleton />
                        </StyledTableCell>
                        {renderSkeleton()}
                      </TableRow>
                    ))
                  : dataSource?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {headCell.map((cell) => (
                          <TableCell key={cell.id} sx={cell.sx}>
                            {cell.render ? cell.render(row) : row[cell.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={totalPageNumber}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            sx={{ display: "flex", justifyContent: "flex-end", mt: "10px" }}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default TableCustom;
