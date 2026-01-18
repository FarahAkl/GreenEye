import axios, { isAxiosError } from "axios";
import { AuthGeneralResponseSchema, type loginT, type registerT, type responseT } from "../schemas/authSchema";
import axiosInstance from "./axiosInstance";

export const register = async (data: registerT) => {
  try {
    const res = await axiosInstance.post("/api/Authentication/register", data);
    const validateRes = AuthGeneralResponseSchema.parse(res.data);
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

export const login = async (data: loginT): Promise<responseT> => {
  try {
    const res = await axiosInstance.post("/api/Authentication/login", data);
    const validatedRes = AuthGeneralResponseSchema.parse(res.data);
    return validatedRes;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      try {
        const parsedError = AuthGeneralResponseSchema.parse(
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

