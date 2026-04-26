import { useQuery } from "@tanstack/react-query";
import { getOrdersCount } from "../services/apiAdmin";

export const useOrdersCount = () => {
  const {
    data: ordersCount,
    isPending: isFetchingOrdersCount,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders-count"],
    queryFn: getOrdersCount,
    staleTime: 1000 * 60 * 5,
  });

  return { ordersCount, isFetchingOrdersCount, isError, error };
};
