import { useQuery } from "@tanstack/react-query";
import type { shippingRateRequestT } from "../../../schemas/shippingSchema";
import { addShippingRate } from "../services/apiOrder";

const useShippingRate = (shippingInfo: shippingRateRequestT | null) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["shippingRates", shippingInfo],
    queryFn: () => addShippingRate(shippingInfo!),
    enabled: !!shippingInfo,
    staleTime: Infinity,
    retry: false,
  });

  return {
    shippingRates: data?.data ?? null,
    isFetchShippingRate: isPending && !!shippingInfo,
    isError,
    refetch,
  };
};

export default useShippingRate;
