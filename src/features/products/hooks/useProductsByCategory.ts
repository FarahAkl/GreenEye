import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/apiProducts";

export const useProductsByCategory = (categoryId: string) => {
  const {
    data: categoryProducts,
    isPending: isFetchingCategoryProducts,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });

  return { categoryProducts, isFetchingCategoryProducts, isError, error };
};
