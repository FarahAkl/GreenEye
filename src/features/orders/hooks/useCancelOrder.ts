import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder as cancelOrderApi } from "../services/apiOrder";
import toast from "react-hot-toast";

const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: cancelOrder, isPending: isCancelling } = useMutation({
    mutationFn: (id: string) => cancelOrderApi(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { cancelOrder, isCancelling };
};

export default useCancelOrder;
