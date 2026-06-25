import { isAxiosError } from "axios";
import type { updateProfileT } from "../../../schemas/profileSchema";
import axiosInstance from "../../../services/axiosInstance";
import { objectToFormData } from "../../../utils/objectToFormData";

export const getProfile = async (userId?: string) => {
  const res = await axiosInstance.get(`/api/Profile/${userId}`);
  return res.data;
};

export const updateProfile = async (data: updateProfileT) => {
  try {
    const payload = objectToFormData(data);

    const res = await axiosInstance.put("/api/Profile/update", payload);

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Failed to update profile",
      );
    }
    throw err;
  }
};

export const deleteProfile = async () => {
  try {
    const res = await axiosInstance.delete("/api/Profile/delete-account");
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Failed to delete profile",
      );
    }
    throw err;
  }
};
