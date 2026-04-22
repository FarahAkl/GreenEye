import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveUser as approveUserApi } from "../services/apiAdmin";

export const useApproveUser = () => {
  const queryClient = useQueryClient();

  const { mutate: approveUser, isPending: isApproving } = useMutation({
    mutationFn: (userId: string) => approveUserApi(userId),
    onSuccess: (data) => {
      toast.success(data.message || "User approved successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to approve product");
    },
  });

  return { approveUser, isApproving };
};
