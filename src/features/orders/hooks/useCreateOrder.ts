import toast from "react-hot-toast";
import type {
  createOrderSuccessT,
  createOrderT,
} from "../../../schemas/ordersSchema";
import { createOrder as createOrderApi} from "../services/apiOrder";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useCreateOrder = () => {
  const navigate = useNavigate();
  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: (data: createOrderT) => createOrderApi(data),
    onSuccess: (res: createOrderSuccessT) => {
      toast.success(res.message);

      navigate(`/order/${res.data.orderId}/payment`, {
        state: { clientSecret: res.data.clientSecret },
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { createOrder,isCreating };
};

export default useCreateOrder;
