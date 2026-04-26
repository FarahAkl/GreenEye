import { useQuery } from "@tanstack/react-query";
import { getAllPendingWithdrawalRequest } from "../services/apiAdmin";

export const useGetWithdrawals = () => {
  const {
    data: pendingWithdrawals,
    isPending: isFetchingWithdrawals,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: getAllPendingWithdrawalRequest,
    staleTime: 1000 * 60 * 5,
  });

  return {
    pendingWithdrawals,
    isFetchingWithdrawals,
    isFetching,
    isError,
    error,
  };
};
