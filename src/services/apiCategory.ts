import { isAxiosError } from "axios";
import {
  createCategoryRequestSchema,
  createCategoryResponse,
  type createCategoryRequestT,
} from "../schemas/categorySchema";
import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const res = await axiosInstance.get("/api/marketplace/Category");
  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await axiosInstance.get(`/api/marketplace/Category/${id}`);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/api/marketplace/Category/${id}`);
  return res.data;
};

export const createCategory = async (data: createCategoryRequestT) => {
  const validateDate = createCategoryRequestSchema.parse(data);
  try {
    const res = await axiosInstance.post(
      `/api/marketplace/Category`,
      validateDate,
    );
    const validatedRes = createCategoryResponse.parse(res.data);
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
