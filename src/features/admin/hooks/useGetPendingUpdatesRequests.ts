import { useQuery } from "@tanstack/react-query";
import { getProductUpdatesPending } from "../services/apiAdmin";

export const useGetPendingUpdatesResquests = () => {
  const {
    data: pendingUpdates,
    isPending: isFetchingUpdates,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-products-updates"],
    queryFn: getProductUpdatesPending,
    staleTime: 1000 * 60 * 5,
  });

  return { pendingUpdates, isFetchingUpdates, isError, error };
};
