import { isAxiosError } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { objectToFormData } from "../../../utils/objectToFormData";
import type {
  createProductT,
  updateProductT,
} from "../../../schemas/supplierSchema";

export type profitsParamsT = {
  year?: number;
  month?: number;
};

export const getSupplierProducts = async (supplierId: string) => {
  const res = await axiosInstance.get(
    `/api/Supplier/supplier/${supplierId}/products`,
  );
  return res.data;
};

export const addProducts = async (data: createProductT) => {
  try {
    const formData = objectToFormData(data);
    const res = await axiosInstance.post(
      "/api/Supplier/add-products",
      formData,
    );

    return res.data;
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

export const updateProduct = async ({
  id,
  params,
}: {
  id: string;
  params: updateProductT;
}) => {
  const payload = objectToFormData(params);
  const res = await axiosInstance.put(
    `/api/Supplier/product/${id}/update`,
    payload,
  );
  return res.data;
};

export const deleteProduct = async (productId: string) => {
  const res = await axiosInstance.delete(`/api/Supplier/product/${productId}`);
  return res.data;
};

export const getSupplierOrders = async (supplierId: string) => {
  const res = await axiosInstance.get(
    `/api/Supplier/supplier/${supplierId}/orders`,
  );
  return res.data;
};

export const getSupplierProfits = async ({
  supplierId,
  params,
}: {
  supplierId: string;
  params: profitsParamsT;
}) => {
  const res = await axiosInstance.get(`/api/Supplier/profits/${supplierId}`, {
    params,
  });
  return res.data;
};
