import { useQuery } from "@tanstack/react-query";
import { getSupplierWallet } from "../services/apiWallets";

export const useGetSupplierWallet = () => {
  const {
    data: wallet,
    isPending: isFetchingWallet,
    isError,
    error,
  } = useQuery({
    queryKey: ["supplier-wallet"],
    queryFn: getSupplierWallet,
    staleTime: 1000 * 60 * 5,
  });

  return { wallet, isFetchingWallet, isError, error };
};
