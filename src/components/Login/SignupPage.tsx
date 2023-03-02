import React from "react";
import Signup from "./Signup";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { fetchSignupAsync, SignupRequestPayload } from "./account.action";

const schemaSignup = yup.object().shape({
  email: yup.string().required().trim(),
  password: yup.string().required().trim(),
  fullName: yup.string().required().trim(),
  telephone: yup.string().required().trim(),
  address: yup.string().required().trim(),
});

interface SignupContentType {
  email: string;
  password: string;
  fullName: string;
  telephone: string;
  address: string;
  imageUrl: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      telephone: "",
      address: "",
      imageUrl: "",
    },
    validationSchema: schemaSignup,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: SignupContentType) => {
      const a: { payload: SignupRequestPayload; navigate: NavigateFunction } = {
        payload: {
          password: values.password,
          email: values.email,
          fullName: values.fullName,
          telephone: values.telephone,
          address: values.address,
          imageUrl: values.imageUrl,
        },
        navigate,
      };
      dispatch(fetchSignupAsync(a));

      localStorage.setItem("email", values.email);

      formik.resetForm();
    },
  });
  return (
    <div>
      <Signup formik={formik} />
    </div>
  );
}
