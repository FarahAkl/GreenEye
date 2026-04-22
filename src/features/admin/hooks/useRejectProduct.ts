import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectProduct as rejectProductApi } from "../services/apiAdmin";
import type { rejectProductT } from "../../../schemas/adminSchema";

export const useRejectProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectProduct, isPending: isRejecting } = useMutation({
    mutationFn: ({
      productId,
      params,
    }: {
      productId: string;
      params: rejectProductT;
    }) => rejectProductApi({ productId, params }),
    onSuccess: (data) => {
      toast.success(data.message || "Product rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-products"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reject product");
    },
  });

  return { rejectProduct, isRejecting };
};
