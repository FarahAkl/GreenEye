import { useQuery } from "@tanstack/react-query";
import { getAllWallets } from "../services/apiWallets";

export const useGetAllWallets = () => {
  const {
    data: walletsData,
    isPending: isFetchingWallets,
    isError,
    error,
  } = useQuery({
    queryKey: ["wallets"],
    queryFn: getAllWallets,
    staleTime: 1000 * 60 * 5,
  });

  return { walletsData, isFetchingWallets, isError, error };
};
