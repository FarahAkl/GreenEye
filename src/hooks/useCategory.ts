import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/apiCategory";

export const useCategory = () => {
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

  return { categories, isFetchingCategories, isError, error };
};
