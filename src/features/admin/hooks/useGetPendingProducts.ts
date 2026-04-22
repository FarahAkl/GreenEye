import { useQuery } from "@tanstack/react-query";
import { getAllPendingProducts } from "../services/apiAdmin";

export const useGetPendingProducts = () => {
  const {
    data: pendingProducts,
    isPending: isFetchingProducts,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-products"],
    queryFn: getAllPendingProducts,
    staleTime: 1000 * 60 * 5,
  });

  return { pendingProducts, isFetchingProducts, isFetching, isError, error };
};
