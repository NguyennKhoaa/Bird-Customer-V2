import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Layout from "../Appbar/Layout";
import Appbar from "../Appbar/Appbar";

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
const ProductNewForm = (): JSX.Element => {
  return (
    <Layout>
      <Appbar />
      <Box style={{ marginTop: "75px", marginLeft: "70px" }}>
        <Box>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={11}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <LabelStyle style={{ color: "black" }}>
                      ID <StarIcon sx={{ fontSize: "10px", color: "red" }} />
                    </LabelStyle>
                    <TextField
                      // onBlur={formik.handleBlur}
                      name="name"
                      fullWidth
                      value="{formik.values.name}"
                      // onChange={formik.handleChange}
                    />

                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <LabelStyle style={{ color: "black" }}>
                            Tên nơi lưu trú{" "}
                            <StarIcon sx={{ fontSize: "10px", color: "red" }} />
                          </LabelStyle>
                          <TextField
                            //   onBlur={formik.handleBlur}
                            fullWidth
                            name="website"
                            value="{formik.values.website}"
                            //   onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <LabelStyle style={{ color: "black" }}>
                            Loại{" "}
                            <StarIcon sx={{ fontSize: "10px", color: "red" }} />
                          </LabelStyle>
                          <TextField
                            //   onBlur={formik.handleBlur}
                            fullWidth
                            name="phone"
                            value="{formik.values.phone}"
                            //   onChange={formik.handleChange}
                            InputProps={{
                              sx: {
                                "& input": {
                                  textAlign: "right",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <LabelStyle style={{ color: "black" }}>
                      Địa chỉ{" "}
                      <StarIcon sx={{ fontSize: "10px", color: "red" }} />
                    </LabelStyle>
                    <TextField
                      //   onBlur={formik.handleBlur}
                      fullWidth
                      name="website"
                      value="{formik.values.website}"
                      //   onChange={formik.handleChange}
                    />

                    <Box>
                      <LabelStyle style={{ color: "black" }}>
                        Description{" "}
                        <StarIcon sx={{ fontSize: "10px", color: "red" }} />
                      </LabelStyle>
                      <TextField
                        //   onBlur={formik.handleBlur}
                        name="description"
                        multiline
                        minRows={10}
                        maxRows={9}
                        style={{ width: "1045px" }}
                        value="{formik.values.description}"
                        //   onChange={formik.handleChange}
                      />
                    </Box>
                  </Stack>
                </Card>
                <Button variant="contained">Contained</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductNewForm;
