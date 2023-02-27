import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { PathApi } from "../constant/pathApi";

const restAPI: AxiosInstance = axios.create({
  baseURL: PathApi.localPath,
});

restAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    // if (!config) {
    //   config = {};
    // }
    // if (!config.headers) {
    //   config.headers = {};
    // }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  } else {
    return config;
  }
});

export default restAPI;
export type RestClient = typeof restAPI;
