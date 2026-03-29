import { isAxiosError } from "axios";
import {
  createProductResponseSchema,
  createProductsRequestSchema,
  type createProductT,
  // type updateProductT,
} from "../../../schemas/productsSchema";
import axiosInstance from "../../../services/axiosInstance";

export type searchParamsT = {
  query?: string;
  categoryId?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type paginationParamsT = {
  pageNumber?: number;
  pageSize?: number;
};

export const getProducts = async (params?: paginationParamsT) => {
  const res = await axiosInstance.get("/api/marketplace/Product/all-products", {
    params,
  });
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/api/marketplace/Product/product/${id}`);
  return res.data;
};

// moved to SupplierDashboard

// export const deleteProduct = async (id: string) => {
//   const res = await axiosInstance.delete(`/api/marketplace/Product/${id}`);
//   return res.data;
// };

// export const updateProduct = async ({
//   id,
//   data,
// }: {
//   id: string;
//   data: updateProductT;
// }) => {
//   try {
//     const res = await axiosInstance.put(`/api/marketplace/Product/${id}`, data);
//     return res.data;
//   } catch (err) {
//     if (isAxiosError(err)) {
//       throw new Error(
//         err.response?.data?.message || "Failed to update product",
//       );
//     }
//     throw err;
//   }
// };

export const getProductsByCategory = async ({ categoryId, pageNumber, pageSize }: { categoryId: string, pageNumber?: number, pageSize?: number }) => {
  const res = await axiosInstance.get(
    `/api/marketplace/Product/category/${categoryId}`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    },
  );
  return res.data;
};

export const getProductBySearch = async (params?: searchParamsT) => {
  const res = await axiosInstance.get("/api/marketplace/Product/search", {
    params,
  });
  return res.data;
};

export const createProduct = async (data: createProductT) => {
  const validateDate = createProductsRequestSchema.parse(data);
  try {
    const res = await axiosInstance.post(
      `/api/marketplace/Product/create`,
      validateDate,
    );
    const validatedRes = createProductResponseSchema.parse(res.data);
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
