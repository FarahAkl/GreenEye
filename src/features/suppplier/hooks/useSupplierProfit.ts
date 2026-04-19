import { useQuery } from "@tanstack/react-query";
import { getSupplierProfits, type profitsParamsT } from "../services/apiSupplier";

export const useSupplierProfit = (supplierId: string, params: profitsParamsT) => {
  const {
    data: profits,
    isPending: isFetchingProfits,
    isError,
    error,
  } = useQuery({
    queryKey: ["supplier-profits", supplierId, params.year, params.month],
    queryFn: () => getSupplierProfits({ supplierId, params }),
    enabled: !!supplierId,
    staleTime: 1000 * 60 * 5,
  });

  return { profits, isFetchingProfits, isError, error };
};
