import { useQuery } from "@tanstack/react-query";
import { getProducts, type paginationParamsT } from "../services/apiProducts";
import type { productsResponseT } from "../../../schemas/productsSchema";

export const useProducts = (params?: paginationParamsT) => {
  const {
    data: products,
    isPending: isFetchingProducts,
    isError,
    error,
  } = useQuery<productsResponseT, Error>({
    queryKey: ["products", params?.pageNumber ?? 1, params?.pageSize ?? 10],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
  });

  return { products, isFetchingProducts, isError, error };
};
