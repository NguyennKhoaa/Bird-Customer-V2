import { Box, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

export default function Resend() {
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email") || "",
    },
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: () => {
      axios({
        method: "POST",
        url: "https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/ResendCode",
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
    },
  });
  return (
    // <Box sx={{ textAlign: "right" }}>
    <form
      className="rounded bg-white p-10 shadow-sm"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <Button type="submit">Resend</Button>
    </form>
    // </Box>
  );
}
