import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { createOrderT } from "../../../schemas/ordersSchema";
import { createOrder as createOrderApi } from "../services/apiOrder";

const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createOrder,
    data,
    isPending: isCreating,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (orderData: createOrderT) => createOrderApi(orderData),
    onSuccess: async (response) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" }),
        queryClient.invalidateQueries({ queryKey: ["orders"], refetchType: "all" }),
        queryClient.invalidateQueries({
          queryKey: ["order", String(response.data.orderId)],
          refetchType: "all",
        }),
      ]);
    },
  });

  return {
    createOrder,
    orderId: data?.data.orderId ?? null,
    clientSecret: data?.data.clientSecret ?? null,
    isCreating,
    isError,
    error,
    reset,
  };
};

export default useCreateOrder;
