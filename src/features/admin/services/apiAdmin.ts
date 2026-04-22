import type {
  rejectProductT,
  rejectT,
  withdrawalApproveT,
} from "../../../schemas/adminSchema";
import axiosInstance from "../../../services/axiosInstance";

export const getAllPendingUsers = async () => {
  const res = await axiosInstance.get("/api/Admin/all-pending-users");
  return res.data;
};

export const approveUser = async (userId: string) => {
  const res = await axiosInstance.put(`/api/Admin/user/${userId}/approve`);
  return res.data;
};

export const rejectUser = async ({
  userId,
  params,
}: {
  userId: string;
  params: rejectT;
}) => {
  const res = await axiosInstance.put(
    `/api/Admin/user/${userId}/approve`,
    params,
  );
  return res.data;
};

export const getAllPendingWithdrawalRequest = async () => {
  const res = await axiosInstance.get(
    "/api/Admin/all-pending-withdrawal-request",
  );
  return res.data;
};

export const approveWithdrawalRequest = async ({
  withdrawalRequestId,
  params,
}: {
  withdrawalRequestId: string;
  params: withdrawalApproveT;
}) => {
  const res = await axiosInstance.put(
    `/api/Admin/withdrawal-request/${withdrawalRequestId}/approve`,
    params,
  );
  return res.data;
};

export const rejectWithdrawalRequest = async ({
  withdrawalRequestId,
  params,
}: {
  withdrawalRequestId: string;
  params: rejectT;
}) => {
  const res = await axiosInstance.put(
    `/api/Admin/withdrawal-request/${withdrawalRequestId}/reject`,
    params,
  );
  return res.data;
};

export const getAllPendingProducts = async () => {
  const res = await axiosInstance.get(`/api/Admin/all-pending-products`);
  return res.data;
};

export const approveProduct = async (productId: string) => {
  const res = await axiosInstance.put(
    `/api/Admin/product/${productId}/approve`,
  );
  return res.data;
};

export const rejectProduct = async ({
  productId,
  params,
}: {
  productId: string;
  params: rejectProductT;
}) => {
  const res = await axiosInstance.put(
    `/api/Admin/product/${productId}/reject`,
    params,
  );
  return res.data;
};

export const getAllUsers = async (params: {
  role?: string;
  pageSize?: number;
  pageNumber?: number;
  orderByDirection?: string;
}) => {
  const res = await axiosInstance.get(`/api/Admin/all-users`, { params });
  return res.data;
};

export const getProductsCount = async () => {
  const res = await axiosInstance.get(`/api/Admin/products-count`);
  return res.data;
};

export const getOrdersCount = async () => {
  const res = await axiosInstance.get(`/api/Admin/orders-count`);
  return res.data;
};
