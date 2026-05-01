import { useQuery } from "@tanstack/react-query";
import { getUserOrdersById } from "../services/apiOrder";

const useUserOrders = (userId: string) => {
  const {
    data: orders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrdersById(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });

  return {
    orders,
    isFetchingOrders,
    isError,
    error,
  };
};

export default useUserOrders;
