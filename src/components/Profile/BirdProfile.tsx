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
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import UploadAvatar from "./uploadAvatar";
import { toast } from "react-toastify";
import { useFormik } from "formik";

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

interface AddProfile {
  name: string;
  imageUrl: string;
  type: string;
  description: string;
  accountId: number;
}

interface IBirdProfile {
  data: Data[];
}
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

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

export default function BirdProfile() {
  const [data, setData] = React.useState<IBirdProfile>();
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      type: "",
      description: "",
      accountId: 1,
    },
    // validationSchema: schemaLogin,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: AddProfile) => {
      axios({
        method: "POST",
        url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/CreateBirdProfile",
        data: values,
      })
        .then((rs) => {
          console.log(rs);
          toast("🦄 Add Success", {
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
    <>
      <Appbar />
      <Box sx={{ display: "flex", marginBottom: "20px" }}>
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

        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ marginTop: "50px", marginLeft: "1069px" }}
        >
          Add
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "50%" }}>
            <Typography
              sx={{ marginBottom: "15px" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Thêm thông tin chim
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128, marginTop: "20px" }}>
                  <UploadAvatar
                    height={140}
                    width={140}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      const { name } = event.target;
                      if (!event.target.files) return;
                      console.log(event.target.files[0]);

                      formik.setFieldValue(name, event.target.files[0]);
                      setAvatar(URL.createObjectURL(event.target.files[0]));
                    }}
                    image={avatar}
                    name="avatar"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <form
                    className="rounded bg-white p-10 shadow-sm"
                    onSubmit={formik.handleSubmit}
                    noValidate
                  >
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        Tên chim
                      </Typography>
                      <TextField
                        onBlur={formik.handleBlur}
                        name="name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />

                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        Thể loại
                      </Typography>
                      <TextField
                        onBlur={formik.handleBlur}
                        name="type"
                        fullWidth
                        value={formik.values.type}
                        onChange={formik.handleChange}
                      />

                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        Mô tả
                      </Typography>
                      <TextField
                        onBlur={formik.handleBlur}
                        name="description"
                        multiline
                        minRows={10}
                        maxRows={9}
                        style={{ width: "100%" }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{ marginTop: "15px" }}
                        type="submit"
                        variant="contained"
                      >
                        Cập nhật
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>

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
                        row.status === "active" ? "rgb(162, 252, 162)" : "red",
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
