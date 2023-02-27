import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Layout from "../Appbar/Layout";
import Appbar from "../Appbar/Appbar";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import useEffectOnce from "../hook/useEffectOnce";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { selectAccountState } from "../Login/account.selector";

const columns: { name: string }[] = [
  { name: "Tên" },
  { name: "Loại" },
  { name: "Ngày" },
  { name: "Trạng thái" },
  // { name: "" },
];
interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface Data {
  id: string;
  imageUrl: string;
  email: string;
  fullName: string;
  dob: string;
  telephone: string;
  address: string;
  role: string;
  code: string;
  dateCreate: string;
  status: string;
}

interface ITableUser {
  statusCode: string;
  content: string;
  data: Data[];
  totalpage: number;
  pagesize: number;
  pagenumber: number;
}

const TableUser = (): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useAppDispatch();
  const accountState = useSelector(selectAccountState);

  const [listUser, setListUser] = useState<ITableUser>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/GetAccountList?pagesize=10&pagenumber=1",
    })
      .then((rs) => {
        console.log("data", rs.data);

        setListUser(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useEffectOnce(() => {
  //   dispatch(
  //     fetchAccountApi({
  //       search: "",
  //       pagesize: 0,
  //       pagenumber: 0,
  //     })
  //   );
  // });

  return (
    <Layout>
      <Appbar />
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
          marginTop: "75px",
          marginLeft: "70px",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            sx={{ minWidth: 650, tableLayout: "fixed" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgb(244, 246, 248)" }}>
                {columns.map((item) => {
                  return (
                    <StyledTableCell
                      key={item.name}
                      align="center"
                      sx={{ borderBottom: "none" }}
                    >
                      <Typography
                        component="h3"
                        color="white"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {listUser?.data.map((row, index) => {
                return (
                  <StyledTableRow key={row.id}>
                    {/* <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ borderBottom: "none" }}
                    >
                      {index +
                        rowsPerPage * (accountState.result.currentPage - 1) +
                        1}
                    </StyledTableCell> */}

                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ borderBottom: "none", justifyContent: "center" }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={row.imageUrl}
                          style={{ marginRight: "10px" }}
                        />
                        {row.fullName}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderBottom: "none" }}
                    >
                      {row.role}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderBottom: "none" }}
                    >
                      {row.dateCreate.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderBottom: "none", fontWeight: "bold" }}
                    >
                      <Chip
                        label={row.status}
                        style={{
                          width: "80px",
                          backgroundColor:
                            row.status === "Active"
                              ? "rgb(162, 252, 162)"
                              : "red",
                        }}
                      />
                    </StyledTableCell>

                    {/* <ActionUser
                      rowsPerPage={rowsPerPage}
                      id={row.id}
                      status={status}
                      account={row}
                    /> */}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listUser?.pagesize as number}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Layout>
  );
};

export default TableUser;
