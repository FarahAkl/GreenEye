import { isAxiosError } from "axios";
import type { updateProfileT } from "../schemas/profileSchema";
import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  const res = await axiosInstance.get("/api/Profile");
  return res.data;
};

export const updateProfile = async (data: updateProfileT) => {
  try {
    const res = await axiosInstance.put("/api/Profile/update", data);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Failed to update profile");
    }
    throw err;
  }
};
