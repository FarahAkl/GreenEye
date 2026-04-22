import { useQuery } from "@tanstack/react-query";
import { getAllPendingUsers } from "../services/apiAdmin";

export const useGetPendingUsers = () => {
  const {
    data: pendingUsers,
    isPending: isFetchingUsers,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-users"],
    queryFn: getAllPendingUsers,
    staleTime: 1000 * 60 * 5,
  });

  return { pendingUsers, isFetchingUsers, isFetching, isError, error };
};
