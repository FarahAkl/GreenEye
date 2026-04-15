import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { shippingRateRequestT, shippingRateSuccessT } from "../../../schemas/shippingSchema";
import { addShippingRate } from "../services/apiOrder";

const useShippingRate = () => {

  const { mutate: shippingRate, isPending: isFetchShippingRate } = useMutation({
    mutationFn: (data: shippingRateRequestT) => addShippingRate(data),
    onSuccess: (res: shippingRateSuccessT) => {
      toast.success(res.message);
        return res.data;
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { shippingRate, isFetchShippingRate };
};

export default useShippingRate;
