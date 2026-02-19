import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/apiCart";

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

    return { cart, isFetchingCart, isError, error };
}