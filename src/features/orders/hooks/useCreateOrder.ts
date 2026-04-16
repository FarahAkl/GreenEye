import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { createOrderT } from "../../../schemas/ordersSchema";
import { createOrder as createOrderApi } from "../services/apiOrder";

const useCreateOrder = (orderData: createOrderT | null) => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["createOrder", orderData],
    queryFn: async () => {
      const res = await createOrderApi(orderData!);
      // Invalidate cart once order is created
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      return res;
    },
    enabled: !!orderData,
    staleTime: Infinity, // order creation is a one-time event per set of inputs
    retry: false,
  });

  return {
    orderId: data?.data.orderId ?? null,
    clientSecret: data?.data.clientSecret ?? null,
    isCreating: isPending && !!orderData,
    isError,
    error,
  };
};

export default useCreateOrder;
