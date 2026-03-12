import { isAxiosError } from "axios";
import axiosInstance from "../../../services/axiosInstance";
import { cartResponseSchema, type addItemToCartT, type updateItemInCartT } from "../../../schemas/cartSchema";

export const getCart = async () => {
  const res = await axiosInstance.get("/api/marketplace/Cart");
  return res.data;
};

export const deleteCart = async () => {
  const res = await axiosInstance.delete("/api/marketplace/Cart");
  return res.data;
};

export const addItemToCart = async (data: addItemToCartT) => {
  try {
    const res = await axiosInstance.post(
      `/api/marketplace/Cart/add-items`,
      data,
    );
    const validatedRes = cartResponseSchema.parse(res.data);
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

export const updateProductQuantity = async ({
  cartItemId,
  data,
}: {
  cartItemId: string;
  data: updateItemInCartT;
}) => {
  try {
    const res = await axiosInstance.put(
      `/api/marketplace/Cart/items/${cartItemId}`,
      data,
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Failed to update item",
      );
    }
    throw err;
  }
};

export const deleteItemInCart = async (cartItemId:string) => {
  const res = await axiosInstance.delete(
    `/api/marketplace/Cart/items/${cartItemId}`,
  );
  return res.data;
};