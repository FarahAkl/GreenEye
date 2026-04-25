import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  freezeUser as freezeUserApi,
  unfreezeUser as unfreezeUserApi,
} from "../services/apiAdmin";

export const useFreezeUser = () => {
  const queryClient = useQueryClient();

  const { mutate: freezeUser, isPending: isFreezing } = useMutation({
    mutationFn: freezeUserApi,
    onSuccess: (data) => {
      toast.success(data.message || "User freezed successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to freeze user");
    },
  });

  const { mutate: unfreezeUser, isPending: isUnfreezing } = useMutation({
    mutationFn: unfreezeUserApi,
    onSuccess: (data) => {
      toast.success(data.message || "User unfreezed successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to unfreeze user");
    },
  });

  return { freezeUser, unfreezeUser, isFreezing, isUnfreezing };
};
