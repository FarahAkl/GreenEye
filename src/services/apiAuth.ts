import axios, { isAxiosError } from "axios";
import { ErrorResponseSchema, loginSuccessResponseSchema, registerSuccessSchema, type loginT, type registerT } from "../schemas/authSchema";
import axiosInstance from "./axiosInstance";

export const register = async (data: registerT) => {
  try {
    const res = await axiosInstance.post("/api/Authentication/register", data);
    const validateRes = registerSuccessSchema.parse(res.data);
    return validateRes;
  } catch (err) {
    if (isAxiosError(err)) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      throw new Error(message);
    }
    throw err;
  }
};

export const login = async (data: loginT)=> {
  try {
    const res = await axiosInstance.post("/api/Authentication/login", data);
    const validatedRes = loginSuccessResponseSchema.parse(res.data);
    return validatedRes;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      try {
        const parsedError = ErrorResponseSchema.parse(
          error.response.data,
        );
        throw parsedError;
      } catch (err) {
        if (isAxiosError(err)) {
          const message =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Something went wrong";

          throw new Error(message);
        }
        throw err;
      }
    }
    throw error;
  }
};

