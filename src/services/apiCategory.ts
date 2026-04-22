import { isAxiosError } from "axios";
import {
  createCategoryRequestSchema,
  createCategoryResponse,
  type createCategoryRequestT,
} from "../schemas/categorySchema";
import axiosInstance from "./axiosInstance";
import { objectToFormData } from "../utils/objectToFormData";

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
  const payload = objectToFormData(validateDate);
  try {
    const res = await axiosInstance.post(`/api/marketplace/Category`, payload);
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

export const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: createCategoryRequestT;
}) => {
  const validateDate = createCategoryRequestSchema.parse(data);
  const payload = objectToFormData(validateDate);
  try {
    const res = await axiosInstance.put(
      `/api/marketplace/Category/${id}`,
      payload,
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
