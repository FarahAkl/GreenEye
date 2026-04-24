import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeRole as changeRoleApi } from "../services/apiAdmin";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  const { mutate: changeRole, isPending: isChanging } = useMutation({
    mutationFn: changeRoleApi,
    onSuccess: (data) => {
      toast.success(data.message || "Role changed successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to change role");
    },
  });

  return { changeRole, isChanging };
};
