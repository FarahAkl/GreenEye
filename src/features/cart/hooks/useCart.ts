import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addItemToCart as addItemToCartAPI,
  deleteCart as deleteCartApi,
  deleteItemInCart as deleteItemInCartApi,
  getCart,
  updateProductQuantity,
} from "../services/apiCart";
import type {
  addItemToCartT,
  cartResponseT,
  deleteCartT,
  updateItemInCartT,
} from "../../../schemas/cartSchema";
import toast from "react-hot-toast";

export const useCart = () => {
  const queryClient = useQueryClient();

  const invalidateCart = () =>
    queryClient.invalidateQueries({ queryKey: ["cart"] });

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
      invalidateCart();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: deteteCart, isPending: isDeletingCart } = useMutation({
    mutationFn: deleteCartApi,
    onSuccess: (res: deleteCartT) => {
      toast.success(res.message);
      invalidateCart();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: deleteItemInCart, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteItemInCartApi(id),
    onSuccess: (res: deleteCartT) => {
      toast.success(res.message);
      invalidateCart();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateItemQuantity, isPending: isUpdating } = useMutation({
    mutationFn: ({
      cartItemId,
      data,
    }: {
      cartItemId: string;
      data: updateItemInCartT;
    }) => updateProductQuantity({ cartItemId, data }),
    onSuccess: (res: deleteCartT) => {
      toast.success(res.message);
      invalidateCart();
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
    deteteCart,
    isDeletingCart,
    deleteItemInCart,
    isDeleting,
    updateItemQuantity,
    isUpdating,
  };
};
