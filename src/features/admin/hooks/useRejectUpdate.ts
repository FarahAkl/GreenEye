import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectProductUpdates as rejectProductUpdateApi } from "../services/apiAdmin";

export const useRejectProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectProduct, isPending: isRejecting } = useMutation({
    mutationFn: rejectProductUpdateApi,
    onSuccess: (data) => {
      toast.success(data.message || "Product rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-products-updates"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reject product");
    },
  });

  return { rejectProduct, isRejecting };
};
