import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refundOrder as refundOrderApi } from "../services/apiOrder";
import toast from "react-hot-toast";

const useRefundOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: refundOrder, isPending: isRefunding } = useMutation({
    mutationFn: (id: string) => refundOrderApi(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { refundOrder, isRefunding };
};

export default useRefundOrder;
