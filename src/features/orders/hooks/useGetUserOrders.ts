import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/apiOrder";

const useGetUserOrders = (params?: { userId: string }) => {
  const { userId } = params || {};

  const {
    data: orders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders({ userId }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    orders,
    isFetchingOrders,
    isError,
    error,
  };
};

export default useGetUserOrders;
