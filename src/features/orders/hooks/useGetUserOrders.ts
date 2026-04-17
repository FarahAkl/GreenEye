import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserOrders } from "../services/apiOrder";

const useGetUserOrders = ({
  userId,
}: {
  userId?: string;
}) => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders",userId],
    queryFn: () =>
      getUserOrders({userId}),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
    initialData: () => {
      return queryClient.getQueryData(["orders", userId]);
    },
  });

  return {
    orders,
    isFetchingOrders,
    isError,
    error,
  };
};

export default useGetUserOrders;
