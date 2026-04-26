import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveWithdrawalRequest as approveWithdrawalRequestApi } from "../services/apiAdmin";

export const useApproveWithdrawals = () => {
  const queryClient = useQueryClient();

  const { mutate: approveWithdrawal, isPending: isApproving } = useMutation({
    mutationFn: approveWithdrawalRequestApi,
    onSuccess: (data) => {
      toast.success(data.message || "Withdrawal approved successfully");
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to approve withdrawal");
    },
  });

  return { approveWithdrawal, isApproving };
};
