import { useQuery } from "@tanstack/react-query";
import {
  getProductBySearch,
  type searchParamsT,
} from "../services/apiProducts";
import type { productsResponseT } from "../../../schemas/productsSchema";

export const useProductsBySearch = (params?: searchParamsT) => {
  const {
    data: searchProducts,
    isPending: isFetchingSearchProducts,
    isError,
    error,
  } = useQuery<productsResponseT, Error>({
    queryKey: [
      "products",
      "search",
      params?.query ?? "",
      params?.categoryId ?? "",
      params?.pageNumber ?? 1,
      params?.pageSize ?? 10,
    ],
    queryFn: () => getProductBySearch(params),
    enabled: !!params?.query?.trim() || !!params?.categoryId,
    staleTime: 1000 * 60 * 2,
  });

  return { searchProducts, isFetchingSearchProducts, isError, error };
};
