import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectUser as rejectUserApi } from "../services/apiAdmin";
import type { rejectT } from "../../../schemas/adminSchema";

export const useRejectUser = () => {
  const queryClient = useQueryClient();

  const { mutate: rejectUser, isPending: isRejecting } = useMutation({
    mutationFn: ({ userId, params }: { userId: string; params: rejectT }) =>
      rejectUserApi({ userId, params }),
    onSuccess: (data) => {
      toast.success(data.message || "User rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reject user");
    },
  });

  return { rejectUser, isRejecting };
};
