import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductApi } from "../services/apiSupplier";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["supplier-products"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    deleteProduct,
    isDeleting,
  };
};

export default useDeleteProduct;
