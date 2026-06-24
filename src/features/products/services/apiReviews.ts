import axiosInstance from "../../../services/axiosInstance";

export const getProductReviews = async (productId?: string) => {
  const res = await axiosInstance.get(
    `/api/marketplace/Review/product/${productId}`,
  );
  return res.data;
};
