import { useQuery } from "@tanstack/react-query";
import { getProductUpdateDetails } from "../services/apiAdmin";

export const useUpdateRequestDetails = (requestId: string) => {
  const {
    data: requestDetails,
    isPending: isFetchingDetails,
    isError,
    error,
  } = useQuery({
    queryFn: () => getProductUpdateDetails(requestId),
    queryKey: ["product-updates", requestId],
    staleTime: 1000 * 60 * 5,
    enabled: !!requestId,
  });

  return { requestDetails, isFetchingDetails, isError, error };
};
