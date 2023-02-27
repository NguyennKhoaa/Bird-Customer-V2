import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import restAPI, { RestClient } from "../config/axios";
import { toast } from "react-toastify";

const fetchLoginAction = "auth/fetchLogin";

export interface BaseError {
  statusCode: number;
  message: string;
}

export interface ResultPayload {
  statusCode: number;
  message: string;
  accountId: number;
  fullName: string;
  jwttoken: string;
  role: string;
}

export const fetchLogin = async (
  restAPI: RestClient,
  payload: LoginRequestPayload
): Promise<ResultPayload> => {
  let url = "";
  url =
    "https://swpbirdboardingv1.azurewebsites.net/api/v1/Accounts/LoginByMember";
  const response = await restAPI.post<ResultPayload>(url, payload);
  return response.data;
  // localStorage.setItem("accountId");
};

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export const fetchLoginAsync = createAsyncThunk(
  fetchLoginAction,
  async (
    {
      payload,
      navigate,
    }: { payload: LoginRequestPayload; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response: ResultPayload = await fetchLogin(restAPI, payload);
      navigate("/home");
      toast("🦄 Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error as BaseError);
    }
  }
);
