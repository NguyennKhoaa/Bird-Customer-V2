import React from "react";
import Login from "./Login";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { fetchLoginAsync, LoginRequestPayload } from "./account.action";
import { toast } from "react-toastify";

const schemaLogin = yup.object().shape({
  email: yup.string().required().trim(),
  password: yup.string().required().trim(),
});

interface LoginContentType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaLogin,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: LoginContentType) => {
      const a: { payload: LoginRequestPayload; navigate: NavigateFunction } = {
        payload: { password: values.password, email: values.email },
        navigate,
      };
      dispatch(fetchLoginAsync(a));

      formik.resetForm();
    },
  });
  return (
    <div>
      <Login formik={formik} />
    </div>
  );
}
