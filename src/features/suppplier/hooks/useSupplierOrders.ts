import { useQuery } from "@tanstack/react-query";
import { getSupplierOrders } from "../services/apiSupplier";

export const useSupplierOrders = (supplierId: string) => {
  const {
    data: supplierOrders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["supplier-orders", supplierId],
    queryFn: () => getSupplierOrders(supplierId),
    staleTime: 1000 * 60 * 5,
  });

  return { supplierOrders, isFetchingOrders, isError, error };
};
