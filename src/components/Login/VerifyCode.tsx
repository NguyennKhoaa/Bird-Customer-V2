import React, { useState } from "react";
import TextFieldCustoms from "../Profile/TextFieldCustoms";
import { FormikProps } from "formik";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Resend from "./Resend";
import { toast } from "react-toastify";

interface IVerifyCode {
  email: string;
  code: string;
}

interface IVerifyCodeForm {
  formik: FormikProps<IVerifyCode>;
  email: string;
}

export default function VerifyCode({ formik, email }: IVerifyCodeForm) {
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    formik;

  const handleResend = () => {
    axios({
      method: "POST",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/ResendCode?email=${email}`,
    })
      .then((rs) => {
        console.log(rs);
        toast("🦄 Resend Success", {
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
    <div
      className="h-screen bg-cover bg-contain bg-center"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundImage: `url('https://static.tuoitre.vn/tto/i/s626/2015/11/25/chim-boi-ca-01-1448445719.jpg')`,
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
            style={{ width: "500px", marginTop: "60px" }}
          >
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* <div className="text-2xl">Đăng nhập</div> */}
              <TextFieldCustoms
                id="code"
                name="code"
                label="Code"
                condition={Boolean(touched.code && errors.code)}
                errorMessage={errors.code}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                placeholder="Ex: Khoa123"
                variant="outlined"
                type="text"
                required
                value={values.code}
              />
              {/* <Resend /> */}
              <Box sx={{ textAlign: "right" }}>
                <Button onClick={handleResend}>Resend</Button>
              </Box>

              <div className="mt-3">
                <button
                  type="submit"
                  className="lex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
