import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../../services/apiCategory";

export const useGetProductById = (id: string) => {
  const {
    data: productDetails,
    isPending: isFetchingProduct,
    isError,
    error,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getCategoryById(id),
    staleTime: 1000 * 60 * 5,
  });

  return { productDetails, isFetchingProduct, isError, error };
};
