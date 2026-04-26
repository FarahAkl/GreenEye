import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createWithdrawal as createWithdrawalApi } from "../services/apiWallets";

export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient();

  const { mutate: createWithdrawal, isPending: isCreating } = useMutation({
    mutationFn: createWithdrawalApi,
    onSuccess: (data) => {
      toast.success(data.message || "Withdrawal created successfully");
      queryClient.invalidateQueries({ queryKey: ["supplier-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-tansactions"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to create withdrawal");
    },
  });

  return { createWithdrawal, isCreating };
};
