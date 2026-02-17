import { isAxiosError } from "axios";
import {
  forgetPasswordSchema,
  registerSuccessSchema,
  type forgetPasswordT,
} from "../../../schemas/authSchema";
import axiosInstance from "../../../services/axiosInstance";

export const forgetPassword = async (data: forgetPasswordT) => {
  const validatedRequest = forgetPasswordSchema.parse(data);
  try {
    const res = await axiosInstance.post(
      `/api/Authentication/forget-password?email=${validatedRequest.email}`,
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
