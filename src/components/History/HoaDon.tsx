import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

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

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

interface Data {
  bookingId: number;
  dateBooking: string;
  customerName: string;
  birdOfCustomer: string;
  typeOfBird: string;
  dateStart: string;
  dateEnd: string;
  amountDay: 4;
  service: [];
  total: number;
}

interface IHoaDon {
  data: Data;
}

export default function HoaDon({ id }: { id: number }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState<IHoaDon>();
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Bookings/GetBillBooking?bookingid=${id}`,
    })
      .then((rs) => {
        console.log("daaaa", rs.data);

        setData(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      {/* <Button > */}
      <RequestQuoteIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: "70%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hóa đơn tạm tính
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold" }}
                    align="center"
                    colSpan={4}
                  >
                    Details
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Price
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Service</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Customer
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Date Book
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Amount Day
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Sum
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={data?.data.bookingId}>
                  <TableCell>{data?.data.service.join(", ")}</TableCell>
                  <TableCell align="right">{data?.data.customerName}</TableCell>
                  <TableCell align="right">
                    {data?.data.dateBooking.split("T")[0]}
                  </TableCell>
                  <TableCell align="right">{data?.data.amountDay}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell rowSpan={3} />
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell align="right">{data?.data.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      {/* </Button> */}
    </div>
  );
}
