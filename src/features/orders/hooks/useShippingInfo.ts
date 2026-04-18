import { useQuery } from "@tanstack/react-query";
import { getShipmentInfo } from "../services/apiOrder";

const useShippingInfo = (orderId: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["shippingInfo", orderId],
    queryFn: () => getShipmentInfo({ orderId }),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    shippingInfo: data?.data ?? null,
    isFetchShippingInfo: isPending,
    isError,
    refetch,
  };
};

export default useShippingInfo;
