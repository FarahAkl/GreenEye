import toast from "react-hot-toast";
import type {
  createOrderSuccessT,
  createOrderT,
} from "../../../schemas/ordersSchema";
import { createOrder } from "../services/apiOrder";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useCreateOrder = () => {
  const navigate = useNavigate();
  const { mutate: bookTicket, isPending: isBooking } = useMutation({
    mutationFn: (data: createOrderT) => createOrder(data),
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

  return { bookTicket, isBooking };
};

export default useCreateOrder;
