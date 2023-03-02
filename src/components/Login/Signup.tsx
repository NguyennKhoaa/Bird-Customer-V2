import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import TextFieldCustoms from "../Profile/TextFieldCustoms";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikProps } from "formik";

interface IState {
  showPassword: boolean;
}

interface ISignup {
  email: string;
  password: string;
  fullName: string;
  telephone: string;
  address: string;
  imageUrl: string;
}

interface ISignupForm {
  formik: FormikProps<ISignup>;
}

export default function Signup({ formik }: ISignupForm) {
  const [value, setValue] = useState<IState>({
    showPassword: false,
  });

  const handleClickShowPassword = (): void => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    formik;
  return (
    <div
      className="h-screen bg-cover bg-contain bg-center"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundImage: `url('https://static.tuoitre.vn/tto/i/s626/2015/11/25/chim-boi-ca-01-1448445719.jpg')`,
        overflowY: "hidden",
        // chỉnh kích thước ảnh nền nhỏ lại phù hợp với màn hình
      }}
    >
      <div className="container">
        <div
          className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10"
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "280px",
          }}
        >
          <div
            className="lg:col-span-2 lg:col-start-4"
            style={{ width: "700px", marginTop: "-60px" }}
          >
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>
              <TextFieldCustoms
                id="email"
                name="email"
                label="Email"
                condition={Boolean(touched.email && errors.email)}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.email}
              />
              <TextFieldCustoms
                fullWidth={true}
                errorMessage={errors.password}
                label="Password"
                required
                condition={Boolean(touched.password && errors.password)}
              >
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={value.showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={(e): void => {
                    handleBlur(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {value.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Password"
                />
              </TextFieldCustoms>
              <TextFieldCustoms
                id="fullName"
                name="fullName"
                label="Full Name"
                condition={Boolean(touched.email && errors.email)}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.fullName}
              />
              <TextFieldCustoms
                id="telephone"
                name="telephone"
                label="Telephone"
                condition={Boolean(touched.email && errors.email)}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.telephone}
              />
              <TextFieldCustoms
                id="address"
                name="address"
                label="Address"
                condition={Boolean(touched.email && errors.email)}
                errorMessage={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.address}
              />
              <div className="mt-3">
                <button
                  // onClick={() => {
                  //   navigate("home");
                  // }}
                  type="submit"
                  className="lex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Tiếp theo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
