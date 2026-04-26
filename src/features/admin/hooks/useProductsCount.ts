import { useQuery } from "@tanstack/react-query";
import { getProductsCount } from "../services/apiAdmin";

export const useProductsCount = () => {
  const {
    data: productsCount,
    isPending: isFetchingProductsCount,
    isError,
    error,
  } = useQuery({
    queryKey: ["products-count"],
    queryFn: getProductsCount,
    staleTime: 1000 * 60 * 5,
  });

  return { productsCount, isFetchingProductsCount, isError, error };
};
