import { isAxiosError } from "axios";
import {
  forgetPasswordSchema,
  registerSuccessSchema,
  resetPasswordSchema,
  resetPasswordSuccessSchema,
  type forgetPasswordT,
  type resetPasswordT,
} from "../../../schemas/authSchema";
import axiosInstance from "../../../services/axiosInstance";

export const forgetPassword = async (data: forgetPasswordT) => {
  const validatedRequest = forgetPasswordSchema.parse(data);
  try {
    const res = await axiosInstance.post(
      `/api/Authentication/forget-password`,
      validatedRequest,
    );
    const validatedRes = registerSuccessSchema.parse(res.data);
    return validatedRes;
  } catch (err) {
    if (isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      throw new Error(message);
    }
    throw err;
  }
};

export const resetPassword = async (data: resetPasswordT) => {
  const validatedData = resetPasswordSchema.parse(data);

  try {
    const res = await axiosInstance.post(
      "/api/Authentication/reset-password",
      validatedData,
    );
    const validatedRes = resetPasswordSuccessSchema.parse(res.data);
    return validatedRes;
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
