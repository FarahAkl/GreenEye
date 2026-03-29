import { useQuery } from "@tanstack/react-query";
import {
  getProductsByCategory,
  type paginationParamsT,
} from "../services/apiProducts";
import type { productsResponseT } from "../../../schemas/productsSchema";

export const useProductsByCategory = (
  categoryId: string,
  params?: paginationParamsT,
) => {
  const {
    data: categoryProducts,
    isPending: isFetchingCategoryProducts,
    isError,
    error,
  } = useQuery<productsResponseT, Error>({
    queryKey: [
      "products",
      "category",
      categoryId,
      params?.pageNumber ?? 1,
      params?.pageSize ?? 10,
    ],
    queryFn: () =>
      getProductsByCategory({
        categoryId,
        pageNumber: params?.pageNumber,
        pageSize: params?.pageSize,
      }),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });

  return { categoryProducts, isFetchingCategoryProducts, isError, error };
};
