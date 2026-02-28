import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addItemToCart as addItemToCartAPI,
  getCart,
} from "../services/apiCart";
import type {
  addItemToCartT,
  cartResponseT,
} from "../../../schemas/cartSchema";
import toast from "react-hot-toast";

export const useCart = () => {
  const {
    data: cart,
    isPending: isFetchingCart,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: addItemToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: (data: addItemToCartT) => addItemToCartAPI(data),
    onSuccess: (res: cartResponseT) => {
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    cart,
    isFetchingCart,
    isError,
    error,
    addItemToCart,
    isAddingToCart,
  };
};
