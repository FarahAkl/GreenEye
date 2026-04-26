import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions } from "../services/apiWallets";

export const useGetTransactions = (walletId?: string) => {
  const {
    data: walletTransactions,
    isPending: isFetchingTransactions,
    isError,
    error,
  } = useQuery({
    queryKey: ["wallet-tansactions", walletId],
    queryFn: () => getWalletTransactions(walletId),
    // enabled: !!walletId,
    staleTime: 1000 * 60 * 5,
  });

  return { walletTransactions, isFetchingTransactions, isError, error };
};
