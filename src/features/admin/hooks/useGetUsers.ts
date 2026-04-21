import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/apiAdmin";

export const useGetUsers = (params: {
  rule?: string;
  pageSize?: number;
  pageNumber?: number;
  orderByDirection?: string;
}) => {
  const {
    data: users,
    isPending: isFetchingUsers,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "users",
      params.rule,
      params.orderByDirection,
      params.pageNumber,
      params.pageSize,
    ],
    queryFn: () => getAllUsers(params),
    staleTime: 1000 * 60 * 5,
  });

  return { users, isFetchingUsers, isError, error };
};
