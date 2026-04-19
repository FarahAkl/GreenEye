import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProducts } from "../services/apiSupplier";
import toast from "react-hot-toast";

export const useAddProducts = () => {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: addProducts,
    onSuccess: (data) => {
      toast.success(data.message || "Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["supplier-products"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add product");
    },
  });

  return { addProduct, isAdding };
};
