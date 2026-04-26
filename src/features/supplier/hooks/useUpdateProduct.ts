import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "../services/apiSupplier";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: updateProductApi,
    onSuccess: (data) => {
      toast.success(data.message || "Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["supplier-products"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update product");
    },
  });

  return { updateProduct, isUpdating };
};
