import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import ShowerIcon from "@mui/icons-material/Shower";
import MedicationIcon from "@mui/icons-material/Medication";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import StarIcon from "@mui/icons-material/Star";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Divider from "@mui/material/Divider";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import top1 from "../../images/1.png";
import Iframe from "react-iframe";
import Appbar from "../Appbar/Appbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

export interface IFormikProductNewForm {
  name: string;
  address: string;
  description: string;
  openTime: string;
  closeTime: string;
  coordinate: {
    latitude: string;
    longitude: string;
  };
  website: string;
  phone: string;
  lowestPrice: 0;
  highestPrice: 0;
  locationCategory: string;
}

interface Data {
  hostId: number;
  hostName: string;
  hostImage: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  service: string[];
}

interface IAbout {
  statusCode: string;
  content: string;
  data: Data[];
}

interface Datee {
  dateStart: string;
  dateEnd: string;
  hostId: number;
  accountId: number;
  birdProfileId: number;
}

interface Booking {
  dateStart: string;
  dateEnd: string;
  hostId: number;
  accountId: number;
  birdProfileId: number;
}
interface DataItem {
  id: number;
  name: string;
}

export default function About() {
  const [data, setData] = useState<IAbout>();
  const [date, setDate] = useState<Datee>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleDateChangeEnd = (date: Date | null) => {
    setSelectedDateEnd(date);
  };
  const [value, setValue] = useState("");
  const [valueDefault, setValueDefault] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [birdProfileId, setBirdProfileId] = useState(0);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");

    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetBirdProfileList?accountid=${accountId}&pagesize=10&pagenumber=1`,
    })
      .then((response) => {
        const data: DataItem[] = response.data.data;
        const dataDefault = data[0].name;
        const optionValues = data.map((item: DataItem) => item.name);
        setOptions(optionValues);
        setValueDefault(dataDefault);

        // C???p nh???t gi?? tr??? birdProfileId
        const defaultBirdProfileId = data[0].id;
        setBirdProfileId(defaultBirdProfileId);

        // L??u birdProfileId v??o localStorage
        localStorage.setItem("birdProfileId", defaultBirdProfileId as any);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const hostId = localStorage.getItem("hostId");
    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetHostDetail?hostid=${hostId}`,
    })
      .then((rs) => {
        console.log(rs.data.data[0]);

        setData(rs.data);
      })
      .catch();
  }, []);
  const [valueLichTrong, setValueLichTrong] = React.useState<DateRange<Dayjs>>([
    null,
    null,
  ]);
  const formik = useFormik({
    initialValues: {
      dateStart: "",
      dateEnd: "",
      hostId: parseInt(localStorage.getItem("hostId") || "0", 10),
      accountId: parseInt(localStorage.getItem("accountId") || "0", 10),
      birdProfileId: 1,
    },
    // validationSchema: schemaLogin,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: Booking) => {
      axios({
        method: "POST",
        url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/BookingByMember",
        data: values,
      })
        .then((rs) => {
          console.log(rs);
          toast("???? Booking Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Box>
      <Appbar />
      {data?.data.map((item, index) => {
        return (
          <>
            <LabelStyle
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "30px",
                paddingLeft: "24px",
                marginTop: "20px",
              }}
            >
              CLB Chim C???nh {item.hostName}{" "}
            </LabelStyle>
            <Box style={{ display: "flex", marginBottom: "20px" }}>
              <Box style={{ color: "orange", paddingLeft: "24px" }}>
                <StarIcon />
              </Box>
              <Box style={{ marginLeft: "10px", display: "flex" }}>
                <Typography>4.60 (280)</Typography>
                <Typography style={{ marginLeft: "30px" }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>

            <Box
              style={{ marginLeft: "250px" }}
              sx={{
                flexGrow: 1,
              }}
            >
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <img src={top1} alt="abc" />
                </Grid>
                <Grid item xs={8} columns={16}>
                  <Grid xs={8}>
                    <img src={top1} alt="abc" />
                  </Grid>
                  <Grid xs={8} style={{ marginTop: "5px" }}>
                    <img src={top1} alt="abc" height={100} />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid style={{ marginTop: "20px" }} container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <LabelStyle
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "30px",
                        }}
                      >
                        CLB Chim C???nh {item.hostName}{" "}
                      </LabelStyle>
                      <Typography>
                        Ch??o m???ng b???n ???? ?????n v???i CLB Chim C???nh {item.hostName}{" "}
                        trung t??m l??u tr?? chim c???nh s??ng s???a v?? tho??ng m??t ???
                        t???ng tr???t l?? n??i ??? ho??n h???o cho ????? g???i g???m nh???ng ch??
                        chim c???nh c???a b???n
                      </Typography>

                      <LabelStyle
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Kh??ng Gian{" "}
                      </LabelStyle>
                      <Typography>
                        Kh??ng gian n???m t???i t???ng tr???t c???a ng??i nh??. Kh??ng gian
                        r???ng tho??ng m??t ????? ch??m s??c v?? qu???n l?? nh???ng ch?? chim.
                      </Typography>

                      <LabelStyle
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        L???ng Chim
                      </LabelStyle>
                      <Typography>
                        Ch??ng t??i c?? nh???ng l???ng chim t???t ch???t l?????ng cao v?? c??
                        th??? ph?? h???p theo t???ng lo???i chim
                      </Typography>

                      <LabelStyle
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        D???ch V???
                      </LabelStyle>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <SportsMmaIcon />
                            <Typography>Ch???i l??ng</Typography>
                          </Grid>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <ShowerIcon />
                            <Typography>T???m r???a</Typography>
                          </Grid>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <MedicationIcon />
                            <Typography>Thu???c</Typography>
                          </Grid>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <DoneAllIcon />
                            <Typography>Nh???t k?? ch??m s??c</Typography>
                          </Grid>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <RestaurantIcon />
                            <Typography>Th???c ??n theo y??u c???u</Typography>
                          </Grid>
                          <Grid item xs={6} md={4} style={{ display: "flex" }}>
                            <InvertColorsIcon />
                            <Typography>Ngu???n n?????c ph?? h???p</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <form
                    className="rounded bg-white p-10 shadow-sm"
                    onSubmit={formik.handleSubmit}
                    noValidate
                  >
                    <Stack spacing={3}>
                      <Card sx={{ p: 3 }}>
                        <Box style={{ display: "flex" }}>
                          <Grid xs={8} style={{ display: "flex" }}>
                            <LabelStyle
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "20px",
                                paddingRight: "5px",
                              }}
                            >
                              100k
                            </LabelStyle>
                            <LabelStyle
                              style={{
                                color: "black",
                                fontSize: "13px",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              / ng??y
                            </LabelStyle>
                          </Grid>
                          <Grid xs={4} style={{ display: "flex" }}>
                            <StarIcon style={{ color: "orange" }} />
                            <Typography>4.60 (280)</Typography>
                          </Grid>
                        </Box>
                        <FormControl
                          variant="outlined"
                          style={{ width: "100%" }}
                          //error={error}
                        >
                          <InputLabel>Ch???n Chim</InputLabel>
                          <Select
                            onChange={(event) => {
                              handleChange(event as any);
                              const birdProfileId = event.target.value;
                              localStorage.setItem(
                                "birdProfileId",
                                birdProfileId as any
                              ); // Save birdProfileId in localStorage
                            }}
                            style={{ width: "100%" }}
                            label="Ch???n Chim"
                          >
                            {options.map((option) => (
                              <MenuItem
                                key={option}
                                value={option}
                                // defaultValue l?? ph???n t??? s??? 1 trong m???ng options
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div style={{ marginTop: "40px" }}></div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Ng??y b???t ?????u"
                            value={formik.values.dateStart}
                            onChange={(newValue) => {
                              const date = new Date(newValue as any)
                                .toLocaleDateString()
                                .split("/");
                              console.log("new", date);

                              formik.setFieldValue(
                                "dateStart",
                                `${date[2]}-${date[0].padStart(
                                  2,
                                  "0"
                                )}-${date[1].padStart(2, "0")}`
                              );

                              // Update minDate for dateEnd
                              const newMinDate = new Date(newValue as any);
                              if (
                                newMinDate > new Date(formik.values.dateEnd)
                              ) {
                                formik.setFieldValue("dateEnd", newMinDate);
                              }
                            }}
                            minDate={new Date()}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <div style={{ marginTop: "40px" }}></div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Ng??y k???t th??c"
                            value={formik.values.dateEnd}
                            onChange={(newValue) => {
                              const date = new Date(newValue as any)
                                .toLocaleDateString()
                                .split("/");
                              console.log("new", date);

                              formik.setFieldValue(
                                "dateEnd",
                                `${date[2]}-${date[0].padStart(
                                  2,
                                  "0"
                                )}-${date[1].padStart(2, "0")}`
                              );
                            }}
                            minDate={formik.values.dateStart || new Date()}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>

                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Th???i gian"
                          value={valueTime}
                          onChange={(newValue) => {
                            setValueTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ width: "100%", marginTop: "20px" }}
                            />
                          )}
                        />
                      </LocalizationProvider> */}

                        <Box style={{ display: "flex", marginTop: "20px" }}>
                          <Grid xs={8}>
                            <Typography>Total</Typography>
                          </Grid>
                          <Grid xs={4}>
                            <Grid xs={12}>
                              <Typography style={{ fontWeight: "bold" }}>
                                100k
                              </Typography>
                            </Grid>
                            <Grid xs={12}>
                              <Typography style={{ color: "blue" }}>
                                View details
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Button
                          type="submit"
                          style={{
                            margin: "0 auto",
                            display: "flex",
                            marginTop: "20px",
                            padding: "20px 60px",
                            borderRadius: "20px",
                          }}
                          variant="contained"
                        >
                          ?????t ngay
                        </Button>
                        <Divider style={{ marginTop: "40px" }} />
                        <Box
                          style={{
                            display: "flex",
                            marginTop: "20px",
                          }}
                        >
                          <Box>
                            <Avatar
                              alt="Remy Sharp"
                              src="https://picsum.photos/200/300"
                              sx={{ width: 56, height: 56 }}
                            />
                          </Box>
                          <Box style={{ marginLeft: "15px" }}>
                            <Typography>Ch??? chi nh??nh</Typography>
                            <Typography style={{ color: "blue" }}>
                              ?????t c??u h???i
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Stack>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </>
        );
      })}

      <LabelStyle
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "50px",
          paddingLeft: "24px",
        }}
      >
        L???ch Tr???ng{" "}
      </LabelStyle>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          value={valueLichTrong}
          onChange={(newValue) => {
            setValueLichTrong(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>

      <LabelStyle
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "50px",
          paddingLeft: "24px",
        }}
      >
        Review{" "}
      </LabelStyle>
      <Box style={{ display: "flex" }}>
        <Box style={{ color: "orange", paddingLeft: "24px" }}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
        <Box style={{ marginLeft: "10px" }}>
          <Typography>Very Good 4.6/5</Typography>
        </Box>
      </Box>

      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <Box>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://picsum.photos/200/300"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box style={{ marginLeft: "15px" }}>
                  <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Kathryn T.
                  </Typography>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Typography style={{ color: "orange", fontSize: "10px" }}>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </Typography>
                    </Box>
                    <Box style={{ display: "flex", marginLeft: "50px" }}>
                      <Typography>5/5</Typography>
                      <Typography style={{ marginLeft: "50px" }}>
                        Stayted May 2021
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Typography style={{ marginTop: "25x" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              velit ut odit iste provident voluptatem assumenda unde expedita.
              Veritatis reiciendis quos incidunt asperiores illo dignissimos
              dolores omnis quaerat corporis laboriosam. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Esse velit ut odit iste
              provident voluptatem assumenda unde expedita. Veritatis reiciendis
              quos incidunt asperiores illo dignissimos dolores omnis quaerat
              corporis laboriosam.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <Box>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://picsum.photos/200/300"
                    sx={{ width: 56, height: 56 }}
                  />
                </Box>
                <Box style={{ marginLeft: "15px" }}>
                  <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Kathryn T.
                  </Typography>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Typography style={{ color: "orange", fontSize: "10px" }}>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </Typography>
                    </Box>
                    <Box style={{ display: "flex", marginLeft: "50px" }}>
                      <Typography>5/5</Typography>
                      <Typography style={{ marginLeft: "50px" }}>
                        Stayted May 2021
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Typography style={{ marginTop: "25x" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              velit ut odit iste provident voluptatem assumenda unde expedita.
              Veritatis reiciendis quos incidunt asperiores illo dignissimos
              dolores omnis quaerat corporis laboriosam. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Esse velit ut odit iste
              provident voluptatem assumenda unde expedita. Veritatis reiciendis
              quos incidunt asperiores illo dignissimos dolores omnis quaerat
              corporis laboriosam.
            </Typography>
          </Card>
        </Grid>
      </Grid>

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
    </Box>
  );
}
