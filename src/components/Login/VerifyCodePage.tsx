import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import VerifyCode from "./VerifyCode";

const schemaCode = yup.object().shape({
  email: yup.string().required().trim(),
  code: yup.string().required().trim(),
});

interface CodeContentType {
  email: string;
  code: string;
}

export default function VerifyCodePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email") || "",
      code: "",
    },
    validationSchema: schemaCode,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: CodeContentType) => {
      axios({
        method: "PUT",
        url: "https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/ConfirmCode",
        data: values,
      })
        .then((rs) => {
          console.log(rs);
          toast("🦄 Signup Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });

      formik.resetForm();
    },
  });
  return (
    <div>
      <VerifyCode formik={formik} email={formik.values.email}/>
    </div>
  );
}
