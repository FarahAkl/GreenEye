import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderById } from "../services/apiOrder";
import { useProfile } from "../../profile/hooks/useProfile";

const useGetOrderById = (orderId: string) => {
  const queryClient = useQueryClient();
  const { profileData } = useProfile();

  const userId = profileData?.userId;

  const {
    data: order,
    isPending: isFetchingOrder,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById({ id: orderId, params: { userId } }),
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId && !!userId,
    initialData: () => {
      return queryClient.getQueryData(["order", orderId]);
    },
  });

  return {
    order,
    isFetchingOrder,
    isError,
    error,
  };
};

export default useGetOrderById;
