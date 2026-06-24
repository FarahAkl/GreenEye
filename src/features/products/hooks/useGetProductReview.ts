import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../services/apiReviews";

export const useGetProductReview = (id: string) => {
  const {
    data: productReviews,
    isPending: isFetchingProductReviews,
    isError,
    error,
  } = useQuery({
    queryKey: ["productReviews", id],
    queryFn: () => getProductReviews(id),
    staleTime: 1000 * 60 * 5,
  });

  return { productReviews, isFetchingProductReviews, isError, error };
};
