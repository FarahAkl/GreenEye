import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/apiOrder";

const useGetUserOrders = () => {

  const {
    data: orders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
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
