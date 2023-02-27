import React from "react";
import Appbar from "../Appbar/Appbar";
import Footer from "../Footer/Footer";
import CardCarousel from "./CardCarousel";
import GiamGia from "./GiamGia";
import WelcomeDashboard from "./WelcomeDashboard";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import styled from "@emotion/styled";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { Avatar, Button, Card, Grid, Stack, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { unstable_useId as useId } from "@mui/utils";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import {
  useLocaleText,
  WrapperVariantContext,
} from "@mui/x-date-pickers/internals";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

const LabelStyle = styled(Typography)(() => ({
  color: "green",
  marginBottom: "8px",
}));

const CustomActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onClear, onCancel, onSetToday, actions } = props;
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const localeText = useLocaleText();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = useId();

  const actionsArray =
    typeof actions === "function" ? actions(wrapperVariant) : actions;

  if (actionsArray == null || actionsArray.length === 0) {
    return null;
  }

  const menuItems = actionsArray?.map((actionType) => {
    switch (actionType) {
      case "clear":
        return (
          <MenuItem
            data-mui-test="clear-action-button"
            onClick={() => {
              onClear();
              setAnchorEl(null);
            }}
            key={actionType}
          >
            {localeText.clearButtonLabel}
          </MenuItem>
        );
      case "cancel":
        return (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onCancel();
            }}
            key={actionType}
          >
            {localeText.cancelButtonLabel}
          </MenuItem>
        );
      case "accept":
        return (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onAccept();
            }}
            key={actionType}
          >
            {localeText.okButtonLabel}
          </MenuItem>
        );
      case "today":
        return (
          <MenuItem
            data-mui-test="today-action-button"
            onClick={() => {
              setAnchorEl(null);
              onSetToday();
            }}
            key={actionType}
          >
            {localeText.todayButtonLabel}
          </MenuItem>
        );
      default:
        return null;
    }
  });

  return (
    <DialogActions>
      <Button
        id={`picker-actions-${id}`}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": `picker-actions-${id}`,
        }}
      >
        {menuItems}
      </Menu>
    </DialogActions>
  );
};

export default function HomeCustome() {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const [valuee, setValuee] = React.useState<Dayjs | null>(() =>
    dayjs("2022-02-01T00:00")
  );

  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);
  const [valueTime, setValueTime] = React.useState<Dayjs | null>(null);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <Appbar />
      <Box>
        {/* <Grid style={{ marginTop: "20px" }} container spacing={3}>
          <Grid item xs={12} md={8}> */}
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <LabelStyle
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              TÌM KIẾM NHANH{" "}
            </LabelStyle>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={3}>
                <Box
                  sx={{ minWidth: 120 }}
                  style={{ marginTop: "20px", textAlign: "center" }}
                >
                  <FormControl style={{ width: "150px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Đánh giá
                    </InputLabel>
                    <Select
                      style={{ borderRadius: "25px", marginRight: "10px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{ minWidth: 120 }}
                  style={{ marginTop: "20px", textAlign: "center" }}
                >
                  <FormControl style={{ width: "130px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Mức sao
                    </InputLabel>
                    <Select
                      style={{ borderRadius: "25px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{ minWidth: 120 }}
                  style={{ marginTop: "20px", textAlign: "center" }}
                >
                  <FormControl style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">Giá</InputLabel>
                    <Select
                      style={{ borderRadius: "25px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{ minWidth: 120 }}
                  style={{ marginTop: "20px", textAlign: "center" }}
                >
                  <FormControl style={{ width: "100px" }}>
                    <InputLabel id="demo-simple-select-label">More</InputLabel>
                    <Select
                      style={{ borderRadius: "25px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Box>

            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Box>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                >
                  <DateRangePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
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
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    onChange={(newValue) => setValuee(newValue)}
                    value={valuee}
                    renderInput={(params) => <TextField {...params} />}
                    components={{
                      ActionBar: CustomActionBar,
                    }}
                    componentsProps={{
                      actionBar: {
                        actions: ["today"],
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    onChange={(newValue) => setValuee(newValue)}
                    value={valuee}
                    renderInput={(params) => <TextField {...params} />}
                    components={{
                      ActionBar: CustomActionBar,
                    }}
                    componentsProps={{
                      actionBar: {
                        actions: ["today"],
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Stack>
          <Box style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ background: "red" }}
              onClick={() => {
                navigate("result");
              }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Card>
      </Box>
      <div style={{ marginTop: "40px" }}></div>
      <GiamGia />
      <div style={{ marginTop: "40px" }}></div>
      <LabelStyle
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "30px",
          marginLeft: "30px",
        }}
      >
        Nơi nổi bật{" "}
      </LabelStyle>
      <CardCarousel />
      <div style={{ marginTop: "40px" }}></div>
      <WelcomeDashboard />
      <div style={{ marginTop: "20px" }}></div>
      <Footer />
    </>
  );
}
