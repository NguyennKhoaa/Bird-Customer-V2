import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import Footer from "../Footer/Footer";
import Iframe from "react-iframe";
import styled from "@emotion/styled";
import Appbar from "../Appbar/Appbar";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Modal,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Report from "../report/Report";
import HoaDon from "./HoaDon";

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
interface Data {
  bookingId: number;
  dateBooking: string;
  dateStart: string;
  dateEnd: string;
  birdName: string;
  birdShelter: string;
  status: string;
  total: number;
}

function Row(props: { row: Data }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.birdName}
        </TableCell>
        <TableCell align="right">{row.birdShelter}</TableCell>
        <TableCell align="right">{row.dateBooking.split("T")[0]}</TableCell>
        <TableCell align="right">
          <Chip
            label={row.status}
            style={{
              width: "100px",
              fontWeight: "bold",
              backgroundColor:
                row.status === "accepted" ? "rgb(162, 252, 162)" : "red",
            }}
          />
        </TableCell>
        <TableCell align="right" sx={{ display: "flex", marginTop: "8px" }}>
          {/* <Button onClick={handleOpen}> */}
          <AssessmentIcon onClick={handleOpen} />
          {/* </Button> */}

          <HoaDon id={row.bookingId}/>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ width: "50%" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thôn tin Report
              </Typography>
              <Report />
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
            </Box>
          </Modal>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Date Start
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Date End
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.dateBooking}>
                    <TableCell component="th" scope="row">
                      {row.dateStart.split("T")[0]}
                    </TableCell>
                    <TableCell>{row.dateBooking.split("T")[0]}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    {/* <TableCell align="right">{row.dateBooking}</TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function HistoryBooking() {
  const [data, setData] = React.useState<Data[]>();
  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/HistoryBooking?accountid=1&pagesize=50&pagenumber=1",
    })
      .then((rs) => {
        console.log(rs.data.data);

        setData(rs.data.data);
      })
      .catch();
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
        Lịch sử đặt{" "}
      </LabelStyle>
      <TableContainer
        component={Paper}
        style={{ width: "90%", marginLeft: "75px" }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold" }}>Bird Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Bird Shelter
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Date Booking
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => {
              return <Row key={row.bookingId} row={row} />;
            })}
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
