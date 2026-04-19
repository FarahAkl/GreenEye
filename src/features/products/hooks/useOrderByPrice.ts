import { useQuery } from "@tanstack/react-query";
import {
  orderProductsByPrice,
  type orderingParamsT,
} from "../services/apiProducts";

export const useOrderByPrice = (params?: orderingParamsT) => {
  const {
    data: orderedProducts,
    isFetching: isOrderingProducts,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "products",
      "ordered",
      params?.orderByDirection,
      params?.categoryId,
      params?.pageNumber ?? 1,
      params?.pageSize ?? 10,
    ],
    queryFn: () => orderProductsByPrice(params),
    enabled: !!params?.orderByDirection,
    staleTime: 1000 * 60 * 5,
  });

  return { orderedProducts, isOrderingProducts, isError, error };
};
