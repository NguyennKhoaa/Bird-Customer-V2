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
import React, { useCallback, useEffect, useRef, useState } from "react";
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

import { memo } from "react";

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
  hostImage: string;
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
  birdProfileId?: number;
  name: string;
}

interface Feedback {
  customerName: string;
  rating: number;
  feedback: string;
}

interface CardProps {
  sx?: any;
  // Thêm các thuộc tính khác nếu cần
}

const About = () => {
  const [data, setData] = useState<IAbout>();
  const [date, setDate] = useState<Datee>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);
  const [value, setValue] = useState("");
  const [valueDefault, setValueDefault] = useState("");
  const [options, setOptions] = useState<DataItem[]>([]);
  const [birdProfileId124, setBirdProfileId] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    async function fetchData() {
      const hostId = localStorage.getItem("hostId");
      const response = await axios.get<{
        statusCode: number;
        content: string;
        data: Feedback[];
      }>(
        `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetFeedback?hostid=${hostId}`
      );

      if (response.data.statusCode === 200) {
        setFeedbacks(response.data.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");

    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetBirdProfileList?accountid=${accountId}&pagesize=10&pagenumber=1`,
    })
      .then((response) => {
        const data: DataItem[] = response.data.data;
        const dataDefault = data[0].name;
        const optionValues = data.map((item: DataItem) => ({
          birdProfileId: item.birdProfileId,
          name: item.name,
        }));
        setOptions(optionValues);
        setValueDefault(dataDefault);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [hasSelection, setHasSelection] = useState(false);
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setValue(event.target.value);

      const birdProfileId123 = options.find(
        (item) => item.name === event.target.value
      )?.birdProfileId;

      console.log("selected value:", event.target.value);
      console.log("options:", options);
      if (!hasSelection) {
        // Thực hiện render ở đây
        setHasSelection(true);
      }
    },
    [options]
  );

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

  const birdProfileIdtest = localStorage.getItem("birdProfileId");
  const booking = {
    dateStart: selectedDate?.toISOString().split("T")[0] || "",
    dateEnd: selectedDateEnd?.toISOString().split("T")[0] || "",
    hostId: parseInt(localStorage.getItem("hostId") || "0", 10),
    accountId: parseInt(localStorage.getItem("accountId") || "0", 10),
    birdProfileId: parseInt(localStorage.getItem("birdProfileId") || "0", 10),
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/BookingByMember",
      data: booking,
    })
      .then((rs) => {
        console.log(rs);
        toast("🦄 Booking Success", {
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
  };
  return (
    <>
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
                CLB Chim Cảnh {item.hostName}{" "}
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
                <Grid
                  container
                  // nằm giữa
                  justifyContent="center"
                  // mặc định chiều cao và chiều rộng của Grid là 100%
                  // nếu muốn chỉnh chiều cao và chiều rộng thì dùng height và width
                  height="200px"
                  width="500px"
                >
                  <Grid item xs={8}>
                    <img src={item.hostImage} alt="abc" />
                  </Grid>
                  {/* <Grid item xs={8} columns={16}>
                    <Grid xs={8}>
                      <img
                        src={
                          "https://baobariavungtau.com.vn/dataimages/201405/original/images981103_gdhdsfh.jpg"
                        }
                        alt="abc"
                      />
                    </Grid>
                    <Grid xs={8} style={{ marginTop: "5px" }}>
                      <img
                        src={
                          "https://cdn.batdongsan.com.vi/gpictures/500x250/3332/MnxBRjFRaXBNeFJKUXdPa0JKRlZUeENMV1RVZGZIOFJMYXdFNTdFeF9UdUl2NA.jpg"
                        }
                        alt="abc"
                        height={100}
                      />
                    </Grid>
                  </Grid> */}
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
                          CLB Chim Cảnh {item.hostName}{" "}
                        </LabelStyle>
                        <Typography>
                          Chào mừng bạn đã đến với CLB Chim Cảnh {item.hostName}{" "}
                          trung tâm lưu trú chim cảnh sáng sủa và thoáng mát ở
                          tầng trệt là nơi ở hoàn hảo cho để gửi gắm những chú
                          chim cảnh của bạn
                        </Typography>

                        <LabelStyle
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Không Gian{" "}
                        </LabelStyle>
                        <Typography>
                          Không gian nằm tại tầng trệt của ngôi nhà. Không gian
                          rộng thoáng mát để chăm sóc và quản lý những chú chim.
                        </Typography>

                        <LabelStyle
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Lồng Chim
                        </LabelStyle>
                        <Typography>
                          Chúng tôi có những lồng chim tốt chất lượng cao và có
                          thể phù hợp theo từng loại chim
                        </Typography>

                        <LabelStyle
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Dịch Vụ
                        </LabelStyle>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <SportsMmaIcon />
                              <Typography>Chải lông</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <ShowerIcon />
                              <Typography>Tắm rửa</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <MedicationIcon />
                              <Typography>Thuốc</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <DoneAllIcon />
                              <Typography>Nhật kí chăm sóc</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <RestaurantIcon />
                              <Typography>Thức ăn theo yêu cầu</Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={4}
                              style={{ display: "flex" }}
                            >
                              <InvertColorsIcon />
                              <Typography>Nguồn nước phù hợp</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <form
                      className="rounded bg-white p-10 shadow-sm"
                      onSubmit={handleSubmit}
                      noValidate
                    >
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
                              / ngày
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
                        >
                          <InputLabel>Chọn Chim</InputLabel>
                          <Select
                            onChange={(e) => {
                              handleChange(e as any);
                              localStorage.setItem(
                                "birdProfileId",
                                options.find(
                                  (item) => item.name === e.target.value
                                )?.birdProfileId as any
                              );
                            }}
                            style={{ width: "100%" }}
                            label="Chọn Chim"
                          >
                            {options.map((option) => (
                              <MenuItem
                                key={option.birdProfileId}
                                value={option.name}
                              >
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div style={{ marginTop: "40px" }}></div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Ngày bắt đầu"
                            value={selectedDate}
                            onChange={(newValue) => {
                              setSelectedDate(newValue);

                              // Update minDate for dateEnd
                              const newMinDate = new Date(newValue as any);
                              if (
                                selectedDateEnd &&
                                newMinDate > selectedDateEnd
                              ) {
                                setSelectedDateEnd(newMinDate);
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
                            label="Ngày kết thúc"
                            value={selectedDateEnd}
                            onChange={(newValue) =>
                              setSelectedDateEnd(newValue)
                            }
                            minDate={selectedDate || new Date()}
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
                          label="Thời gian"
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
                          Đặt ngay
                        </Button>
                        <Divider style={{ marginTop: "40px" }} />
                        <Box style={{ display: "flex", marginTop: "20px" }}>
                          <Box>
                            <Avatar
                              alt="Remy Sharp"
                              src="https://picsum.photos/200/300"
                              sx={{ width: 56, height: 56 }}
                            />
                          </Box>
                          <Box style={{ marginLeft: "15px" }}>
                            <Typography>Chủ chi nhánh</Typography>
                            <Typography style={{ color: "blue" }}>
                              Đặt câu hỏi
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
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
          Lịch Trống{" "}
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

        <div>
          {feedbacks.map((feedback: Feedback, index: number) => (
            <Grid
              key={index}
              container
              spacing={3}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }} elevation={3}>
                  <Stack spacing={3}>
                    <Box
                      style={{
                        display: "flex",
                        marginTop: "20px",
                      }}
                    >
                      <Box>
                        <img
                          alt={feedback.customerName}
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            feedback.customerName
                          )}&background=random`}
                          style={{ width: 56, height: 56, borderRadius: "50%" }}
                        />
                      </Box>
                      <Box style={{ marginLeft: "15px" }}>
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          {feedback.customerName}
                        </Typography>
                        <Box style={{ display: "flex" }}>
                          <Box>
                            <Typography
                              style={{ color: "orange", fontSize: "10px" }}
                            >
                              {Array.from({ length: feedback.rating }).map(
                                (_, i) => (
                                  <StarIcon key={i} />
                                )
                              )}
                            </Typography>
                          </Box>
                          <Box style={{ display: "flex", marginLeft: "50px" }}>
                            <Typography>{`${feedback.rating}/5`}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Stack>
                  <Typography style={{ marginTop: "25px" }}>
                    {feedback.feedback}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          ))}
        </div>
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
    </>
  );
};

export default memo(About);
