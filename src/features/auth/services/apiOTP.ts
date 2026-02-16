import { isAxiosError } from "axios";
import {
  loginSuccessResponseSchema,
  registerSuccessSchema,
  resendOtpSchema,
  verifyOtpSchema,
  type resendOtpT,
  type verifyOtpT,
} from "../../../schemas/authSchema";
import axiosInstance from "../../../services/axiosInstance";

export const veriftOTP = async (data: verifyOtpT) => {
  const validatedRequest = verifyOtpSchema.parse(data);

  try {
    const res = await axiosInstance.post(
      "/api/Authentication/verify-otp",
      validatedRequest,
    );
    const validatedResponse = loginSuccessResponseSchema.parse(res.data);
    return validatedResponse;
  } catch (err) {
    if (isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      throw new Error(message);
    }
    throw err;
  }
};

export const resendOTP = async (data: resendOtpT) => {
  const validatedRequest = resendOtpSchema.parse(data);

  try {
    const res = await axiosInstance.post(
      "/api/Authentication/resend-otp",
      validatedRequest,
    );
    const success = registerSuccessSchema.parse(res.data);
    return success;
  } catch (err) {
    if (isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      throw new Error(message);
    }
    throw err;
  }
};
