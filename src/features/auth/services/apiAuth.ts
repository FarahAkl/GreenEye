import axios, { isAxiosError } from "axios";
import {
  ErrorResponseSchema,
  loginSuccessResponseSchema,
  registerSuccessSchema,
  type loginT,
  type registerT,
} from "../../../schemas/authSchema";
import axiosInstance from "../../../services/axiosInstance";
import { deleteCookie, getCookie } from "../../../utils/TS-Cookie";

export const register = async (data: registerT) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("rule", data.rule);

    if (data.imageFile && data.imageFile.length > 0) {
      formData.append("imageFile", data.imageFile[0]);
    }

    const res = await axiosInstance.post(
      "/api/Authentication/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

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


export const login = async (data: loginT) => {
  try {
    const res = await axiosInstance.post("/api/Authentication/login", data);
    const validatedRes = loginSuccessResponseSchema.parse(res.data);
    return validatedRes;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      try {
        const parsedError = ErrorResponseSchema.parse(error.response.data);
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

export const logout = async () => {
  const refreshToken = getCookie({ name: "refreshToken" });

  try {
    await axiosInstance.post(`/api/Authentication/revoke-token?token=${refreshToken}`);
  } finally {
    deleteCookie({ name: "token" });
    deleteCookie({ name: "refreshToken" });
    window.location.href = "/login";
  }
};
