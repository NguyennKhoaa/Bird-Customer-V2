import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import CardCustom from "./card";
import UploadAvatar from "./uploadAvatar";
import TextFieldCustoms from "./TextFieldCustoms";
import axios from "axios";
import Appbar from "../Appbar/Appbar";
import Footer from "../Footer/Footer";
import Iframe from "react-iframe";
import styled from "@emotion/styled";

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

interface Data {
  id: number;
  email: string;
  fullName: string;
  dob: string;
  telephone: string;
  address: string;
  role: string;
  status: string;
  code: string;
}

interface IProfile {
  data: Data[];
}

const Profile = (): JSX.Element => {
  const [avatar, setAvatar] = React.useState("");
  const [data, setData] = useState<IProfile>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/Getbyid?id=1",
    })
      .then((rs) => {
        console.log(rs.data.data[0]);
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
        Thông tin cá nhân{" "}
      </LabelStyle>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              mb: 5,
              width: 320,
              height: 196,
              marginLeft: "200px",
              marginTop: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardCustom minWidth={200} height={179} title={"Avatar"}>
                <UploadAvatar
                  height={120}
                  width={120}
                  image="https://picsum.photos/200/300"
                  name="avatar"
                />
                {/* <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3.1 MB
                </Typography> */}
              </CardCustom>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, marginRight: "100px", marginTop: "40px" }}>
            <Stack spacing={3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextFieldCustoms
                  id="username"
                  name="username"
                  label="Họ và tên"
                  fullWidth={true}
                  placeholder="Ex: Khoa123"
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].fullName}
                />
                <TextFieldCustoms
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth={true}
                  placeholder="Ex: Khoa123"
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].email}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextFieldCustoms
                  id="firstName"
                  name="firstName"
                  label="Phone"
                  fullWidth={true}
                  placeholder="Ex: Nguyen, Tran,..."
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].telephone}
                />
                <TextFieldCustoms
                  id="lastName"
                  name="lastName"
                  label="DOB"
                  fullWidth={true}
                  placeholder="Ex: Khoa, Hieu,..."
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].dob.split("T")[0]}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextFieldCustoms
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth={true}
                  placeholder="Ex: 19/7 Pham Van Chieu F9 Quan Go Vap"
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].address}
                />
                <TextFieldCustoms
                  id="phone"
                  name="phone"
                  label="Role"
                  fullWidth={true}
                  placeholder="Ex: 0856 559 742"
                  variant="outlined"
                  type="text"
                  required
                  value={data?.data[0].role}
                />
              </Stack>
            </Stack>
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
    </>
  );
};

export default Profile;
