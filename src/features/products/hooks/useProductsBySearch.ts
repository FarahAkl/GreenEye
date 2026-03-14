import { useQuery } from "@tanstack/react-query";
import { getProductBySearch } from "../services/apiProducts";

export const useProductsBySearch = (query: string) => {
  const {
    data: searchProducts,
    isPending: isFetchingSearchProducts,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => getProductBySearch({ query }),
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 2,
  });

  return { searchProducts, isFetchingSearchProducts, isError, error };
};
