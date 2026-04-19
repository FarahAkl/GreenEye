import axiosInstance from "../../../services/axiosInstance";

export type searchParamsT = {
  query?: string;
  categoryId?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type orderingParamsT = {
  orderByDirection?: "ASC" | "DESC";
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

export const getProductsByCategory = async ({
  categoryId,
  pageNumber,
  pageSize,
}: {
  categoryId: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
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

export const orderProductsByPrice = async (params?: orderingParamsT) => {
  const res = await axiosInstance.get(
    "/api/marketplace/Product/pricing-order",
    {
      params,
    },
  );
  return res.data;
};

