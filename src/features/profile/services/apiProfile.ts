import { isAxiosError } from "axios";
import type { updateProfileT } from "../../../schemas/profileSchema";
import axiosInstance from "../../../services/axiosInstance";

export const getProfile = async () => {
  const res = await axiosInstance.get("/api/Profile");
  return res.data;
};

export const updateProfile = async (data: updateProfileT) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.newImage) {
      formData.append("newImage", data.newImage);
    }

    const res = await axiosInstance.put("/api/Profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Failed to update profile"
      );
    }
    throw err;
  }
};

