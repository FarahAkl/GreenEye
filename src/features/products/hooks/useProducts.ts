import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export const useProducts = () => {
  const {
    data: products,
    isPending: isFetchingProducts,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  return { products, isFetchingProducts, isError, error };
};
