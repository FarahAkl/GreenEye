import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory as createCategoryApi,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
  getCategories,
} from "../services/apiCategory";
import toast from "react-hot-toast";

export const useCategory = () => {
  const queryClient = useQueryClient();

  const {
    data: categories,
    isPending: isFetchingCategories,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message || "Category added successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add category");
    },
  });

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message || "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update category");
    },
  });

  return {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    isDeleting,
    isUpdating,
    isCreating,
    isFetchingCategories,
    isError,
    error,
  };
};
