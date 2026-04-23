import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveProductUpdates as approveProductUpdatesApi } from "../services/apiAdmin";

export const useApproveUpdates = () => {
  const queryClient = useQueryClient();

  const { mutate: approveUpdate, isPending: isApproving } = useMutation({
    mutationFn: approveProductUpdatesApi,
    onSuccess: (data) => {
      toast.success(data.message || "Update approved successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-products-updates"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to approve update");
    },
  });

  return { approveUpdate, isApproving };
};
