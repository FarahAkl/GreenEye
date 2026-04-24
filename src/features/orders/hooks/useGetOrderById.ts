import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/apiOrder";

const useGetOrderById = ({orderId,userId}: {orderId:string,userId?:string}) => {
  const {
    data: order,
    isPending: isFetchingOrder,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById({ id: orderId, params: userId ? { userId } : undefined }),
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId ,
    refetchOnMount: true,
  });

  return {
    order,
    isFetchingOrder,
    isError,
    error,
  };
};

export default useGetOrderById;
