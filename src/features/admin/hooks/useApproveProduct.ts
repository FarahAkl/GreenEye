import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveProduct as approveProductApi } from "../services/apiAdmin";

export const useApproveProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: approveProduct, isPending: isApproving } = useMutation({
    mutationFn: (productId: string) => approveProductApi(productId),
    onSuccess: (data) => {
      toast.success(data.message || "Product approved successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-products"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to approve product");
    },
  });

  return { approveProduct, isApproving };
};
