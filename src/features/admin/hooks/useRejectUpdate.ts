import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectProductUpdates as rejectProductUpdateApi } from "../services/apiAdmin";

export const useRejectUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectUpdate, isPending: isRejecting } = useMutation({
    mutationFn: rejectProductUpdateApi,
    onSuccess: (data) => {
      toast.success(data.message || "Update rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-products-updates"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reject update");
    },
  });

  return { rejectUpdate, isRejecting };
};
