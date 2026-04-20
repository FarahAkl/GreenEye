import { useQuery } from "@tanstack/react-query";
import { getSupplierProducts } from "../services/apiSupplier";

export const useSupplierProducts = (supplierId: string) => {
  const {
    data: supplierProducts,
    isPending: isFetchingProducts,
    isError,
    error,
  } = useQuery({
    queryKey: ["supplier-products", supplierId],
    queryFn: () => getSupplierProducts(supplierId),
    enabled: !!supplierId,
    staleTime: 1000 * 60 * 5,
  });

  return { supplierProducts, isFetchingProducts, isError, error };
};
