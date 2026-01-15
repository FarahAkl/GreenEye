import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../utils/TS-Cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie({ name: "token" });
    // const lang = localStorage.getItem("lang") || "en";

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    // config.headers["Accept-Language"] = lang;

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

export default axiosInstance;
