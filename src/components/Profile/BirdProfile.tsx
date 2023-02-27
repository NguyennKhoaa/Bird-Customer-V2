import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Appbar from "../Appbar/Appbar";
import Iframe from "react-iframe";
import Footer from "../Footer/Footer";
import { Chip, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Data {
  birdProfileId: number;
  name: string;
  imageUrl: string;
  type: string;
  description: string;
  status: string;
}

interface IBirdProfile {
  data: Data[];
}

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

export default function BirdProfile() {
  const [data, setData] = React.useState<IBirdProfile>();
  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/GetBirdProfileList?accountid=1&pagesize=10&pagenumber=1",
    })
      .then((rs) => {
        setData(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Appbar />
      <LabelStyle
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "50px",
          paddingLeft: "24px",
        }}
      >
        Thông tin chim{" "}
      </LabelStyle>
      <TableContainer
        component={Paper}
        style={{ width: "90%", marginLeft: "70px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ảnh</StyledTableCell>
              <StyledTableCell align="right">Tên chim</StyledTableCell>
              <StyledTableCell align="right">Loại</StyledTableCell>
              <StyledTableCell align="right">Mô tả</StyledTableCell>
              <StyledTableCell align="right">Trạng thái</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.imageUrl}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Chip
                    label={row.status}
                    style={{
                      width: "100px",
                      fontWeight: "bold",
                      backgroundColor:
                        row.status === "active"
                          ? "rgb(162, 252, 162)"
                          : "red",
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LabelStyle
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "50px",
          paddingLeft: "24px",
        }}
      >
        Map{" "}
      </LabelStyle>
      <Iframe
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.906551778997!2d106.6566358147493!3d10.818463092292959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529111aa89f9d%3A0xd8f09cc0aa1b27f3!2sTan%20Son%20Nhat%20International%20Airport!5e0!3m2!1sen!2s!4v1601785962230!5m2!1sen!2s"
        width="1510px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
      />
      <div style={{ marginTop: "20px" }}></div>
      <Footer />
    </>
  );
}
