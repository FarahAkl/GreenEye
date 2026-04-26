import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectWithdrawalRequest } from "../services/apiAdmin";
import toast from "react-hot-toast";

export const useRejectWithdrawal = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectWithdrawal, isPending: isRejecting } = useMutation({
    mutationFn: rejectWithdrawalRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Withdrawal rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reject withdrawal");
    },
  });

  return { rejectWithdrawal, isRejecting };
};
