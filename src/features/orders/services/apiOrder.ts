import { isAxiosError } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { createOrderResponseSchema, type createOrderT } from "../../../schemas/ordersSchema";

type getMyOrdersT = {
  userId: string;
};

type supplierOrdersT = {
  supplierId: string;
};

export const createOrder = async (data: createOrderT) => {
  try {
    const res = await axiosInstance.post(
      `/api/marketplace/Order/create-order`,
      data,
    );
    const validatedRes = createOrderResponseSchema.parse(res.data);
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

export const getMyOrders = async (params: getMyOrdersT) => {
  const res = await axiosInstance.get("/api/marketplace/Order/orders", {
    params,
  });
  return res.data;
};

export const getSupplierOrders = async (params: supplierOrdersT) => {
  const res = await axiosInstance.get(
    "/api/marketplace/Order/supplier-orders",
    {
      params,
    },
  );
  return res.data;
};

export const getOrderById = async ({
  id,
  params,
}: {
  id: string;
  params: getMyOrdersT;
}) => {
  const res = await axiosInstance.get(`/api/marketplace/Order/${id}`, {
    params,
  });
  return res.data;
};

export const cancelOrder = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/api/marketplace/Order/${id}/cancel`);
    // const validatedRes = cartResponseSchema.parse(res.data);
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

export const refundOrder = async (id: string) => {
  try {
    const res = await axiosInstance.post(
      `/api/marketplace/Order/${id}/refund-order`,
    );
    // const validatedRes = cartResponseSchema.parse(res.data);
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

// Shipping endpoints

export const getShipmentInfo = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const res = await axiosInstance.get(
    `/api/Shipping/order/${orderId}/shipment-info`,
  );
  return res.data;
};
