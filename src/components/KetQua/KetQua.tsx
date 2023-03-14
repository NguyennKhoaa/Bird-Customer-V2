import React, { useEffect, useState } from "react";
import Appbar from "../Appbar/Appbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Iframe from "react-iframe";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import ketuqaimg from "../../images/1.png";
import StarIcon from "@mui/icons-material/Star";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Label } from "@mui/icons-material";

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

interface Data {
  hostId: string;
  hostName: string;
  hostImage: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  service: [];
}

interface IKetQua {
  statusCode: string;
  content: string;
  data: Data[];
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

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

export default function KetQua() {
  const [data, setData] = useState<IKetQua>();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/GetHostList?pagesize=10&pagenumber=1",
    })
      .then((rs) => {
        setData(rs.data);
      })
      .catch();
  }, []);
  const [age, setAge] = React.useState("");

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box>
      <Appbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    // các trên 30px
                    marginTop: "35px",
                    //cách trái 30px
                    marginLeft: "30px",
                  }}
                >
                  <LabelStyle
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    Gợi ý cho bạn :
                  </LabelStyle>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "25px",
                        width: "130px",
                        height: "40px",
                      }}
                      onClick={() => {
                        navigate("result");
                      }}
                    >
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {" >=50.000đ"}
                      </Typography>
                    </Button>
                  </Grid>
                  <div style={{ width: "20px" }} />
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "25px",
                        width: "130px",
                        height: "40px",
                      }}
                      onClick={() => navigate("/price")}
                    >
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {" >=100.000đ"}
                      </Typography>
                    </Button>
                  </Grid>
                  <div style={{ width: "20px" }} />
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "25px",
                        width: "130px",
                        height: "40px",
                      }}
                      onClick={() => navigate("/price")}
                    >
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {" >=200.000đ"}
                      </Typography>
                    </Button>
                  </Grid>
                  <div style={{ width: "20px" }} />
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "25px",
                        width: "130px",
                        height: "40px",
                      }}
                      onClick={() => navigate("/price")}
                    >
                      <Typography
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {" >=300.000đ"}
                      </Typography>
                    </Button>
                  </Grid>
                </Box>
                {data?.data.map((item, index) => {
                  return (
                    <Box style={{ marginLeft: "90px", marginTop: "15px" }}>
                      <Paper
                        style={{ width: "600px", height: "170px" }}
                        sx={{
                          p: 2,
                          margin: "auto",
                          maxWidth: 1000,
                          flexGrow: 1,
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase sx={{ width: 328, height: 128 }}>
                              <Img
                                onClick={() => {
                                  navigate("about");
                                }}
                                alt="complex"
                                src={ketuqaimg}
                                style={{ borderRadius: "20px" }}
                              />
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography
                                  onClick={() => {
                                    navigate("about");
                                  }}
                                  gutterBottom
                                  variant="subtitle1"
                                  component="div"
                                >
                                  {item.hostName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  onClick={() => {
                                    navigate("about");
                                  }}
                                >
                                  {item.description}
                                </Typography>
                                <Box
                                  style={{ display: "flex", marginTop: "20px" }}
                                >
                                  <Typography
                                    onClick={() => {
                                      navigate("about");
                                    }}
                                  >
                                    <StarIcon style={{ color: "orange" }} />{" "}
                                    4.60 (210)
                                  </Typography>
                                  <Typography
                                    onClick={() => {
                                      navigate("about");
                                    }}
                                    style={{
                                      marginLeft: "20px",
                                      color: "blue",
                                    }}
                                  >
                                    ${item.price.toString().slice(0, 3)}k/
                                    {item.unit}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  );
                })}

                {/* <Box style={{ marginLeft: "90px", marginTop: "15px" }}>
                  <Paper
                    style={{ width: "600px", height: "170px" }}
                    sx={{
                      p: 2,
                      margin: "auto",
                      maxWidth: 1000,
                      flexGrow: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 328, height: 128 }}>
                          <Img
                            onClick={() => {
                              navigate("about");
                            }}
                            alt="complex"
                            src={ketuqaimg}
                            style={{ borderRadius: "20px" }}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography
                              onClick={() => {
                                navigate("about");
                              }}
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              CLB Chim Cảnh Thủ Đức
                            </Typography>
                            <Typography
                              onClick={() => {
                                navigate("about");
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              100 lồng | Sân thoáng mát
                            </Typography>
                            <Box style={{ display: "flex", marginTop: "20px" }}>
                              <Typography
                                onClick={() => {
                                  navigate("about");
                                }}
                              >
                                <StarIcon style={{ color: "orange" }} /> 4.60
                                (210)
                              </Typography>
                              <Typography
                                onClick={() => {
                                  navigate("about");
                                }}
                                style={{ marginLeft: "20px", color: "blue" }}
                              >
                                $100k/ngày
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
                <Box style={{ marginLeft: "90px", marginTop: "15px" }}>
                  <Paper
                    style={{ width: "600px", height: "170px" }}
                    sx={{
                      p: 2,
                      margin: "auto",
                      maxWidth: 1000,
                      flexGrow: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 328, height: 128 }}>
                          <Img
                            onClick={() => {
                              navigate("about");
                            }}
                            alt="complex"
                            src={ketuqaimg}
                            style={{ borderRadius: "20px" }}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography
                              onClick={() => {
                                navigate("about");
                              }}
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              CLB Chim Cảnh Thủ Đức
                            </Typography>
                            <Typography
                              onClick={() => {
                                navigate("about");
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              100 lồng | Sân thoáng mát
                            </Typography>
                            <Box style={{ display: "flex", marginTop: "20px" }}>
                              <Typography
                                onClick={() => {
                                  navigate("about");
                                }}
                              >
                                <StarIcon style={{ color: "orange" }} /> 4.60
                                (210)
                              </Typography>
                              <Typography
                                onClick={() => {
                                  navigate("about");
                                }}
                                style={{ marginLeft: "20px", color: "blue" }}
                              >
                                $100k/ngày
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box> */}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={8} style={{ marginTop: "20px" }}>
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.906551778997!2d106.6566358147493!3d10.818463092292959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529111aa89f9d%3A0xd8f09cc0aa1b27f3!2sTan%20Son%20Nhat%20International%20Airport!5e0!3m2!1sen!2s!4v1601785962230!5m2!1sen!2s"
              width="750px"
              height="610px"
              id=""
              className=""
              display="block"
              position="relative"
            />
          </Grid>
        </Grid>
      </Box>

      {/* table */}
      <Box style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={3}
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Nơi lưu trú đề cử
                </TableCell>
                <TableCell align="right">
                  Sắp xếp <ArrowDropDownIcon style={{ color: "red" }} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography>
                    2:30 PM - 6:59 PM
                    <Typography variant="body2" color="text.secondary">
                      100 lồng | Sân thoáng mát
                    </Typography>
                  </Typography>
                  <Typography style={{ marginTop: "40px" }}>
                    2:30 PM - 6:59 PM
                    <Typography variant="body2" color="text.secondary">
                      100 lồng | Sân thoáng mát
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    11h29m
                    <Typography variant="body2" color="text.secondary">
                      Thời gian gặp mặt
                    </Typography>
                  </Typography>
                  <Typography style={{ marginTop: "40px" }}>
                    11h29m
                    <Typography variant="body2" color="text.secondary">
                      Thời gian gặp mặt
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <StarIcon style={{ color: "orange" }} />1{" "}
                    <ArrowDropUpIcon style={{ color: "red" }} />
                  </Box>
                  <Box style={{ marginTop: "60px" }}>
                    <StarIcon style={{ color: "orange" }} />1{" "}
                    <ArrowDropUpIcon style={{ color: "red" }} />
                  </Box>
                </TableCell>
                <TableCell align="right">130k/ngày</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography>
                    2:30 PM - 6:59 PM
                    <Typography variant="body2" color="text.secondary">
                      100 lồng | Sân thoáng mát
                    </Typography>
                  </Typography>
                  <Typography style={{ marginTop: "40px" }}>
                    2:30 PM - 6:59 PM
                    <Typography variant="body2" color="text.secondary">
                      100 lồng | Sân thoáng mát
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    11h29m
                    <Typography variant="body2" color="text.secondary">
                      Thời gian gặp mặt
                    </Typography>
                  </Typography>
                  <Typography style={{ marginTop: "40px" }}>
                    11h29m
                    <Typography variant="body2" color="text.secondary">
                      Thời gian gặp mặt
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <StarIcon style={{ color: "orange" }} />1{" "}
                    <ArrowDropUpIcon style={{ color: "red" }} />
                  </Box>
                  <Box style={{ marginTop: "60px" }}>
                    <StarIcon style={{ color: "orange" }} />1{" "}
                    <ArrowDropUpIcon style={{ color: "red" }} />
                  </Box>
                </TableCell>
                <TableCell align="right">130k/ngày</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
      <div style={{ marginTop: "20px" }}></div>
      <Footer />
    </Box>
  );
}
