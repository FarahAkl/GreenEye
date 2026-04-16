import { useState } from "react";
import type { shippingRateRequestT, shippingRateSuccessT, shippingRateT } from "../../../schemas/shippingSchema";
import toast from "react-hot-toast";
import { addShippingRate } from "../services/apiOrder";
import { useMutation } from "@tanstack/react-query";

const useShippingRate = () => {
  const [shippingRates, setShippingRates] = useState<shippingRateT[] | null>(
    null,
  );

  const { mutate: shippingRate, isPending: isFetchShippingRate } = useMutation({
    mutationFn: (data: shippingRateRequestT) => addShippingRate(data),

    onSuccess: (res: shippingRateSuccessT) => {
      setShippingRates(res.data);
      toast.success(res.message);
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    shippingRate,
    isFetchShippingRate,
    shippingRates,
  };
};

export default useShippingRate