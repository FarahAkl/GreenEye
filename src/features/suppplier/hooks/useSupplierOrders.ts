import { useQuery } from "@tanstack/react-query";
import { getSupplierOrders } from "../services/apiSupplier";

export const useSupplierOrders = () => {
  const {
    data: supplierOrders,
    isPending: isFetchingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["supplier-orders"],
    queryFn: getSupplierOrders,
    staleTime: 1000 * 60 * 5,
  });

  return { supplierOrders, isFetchingOrders, isError, error };
};
