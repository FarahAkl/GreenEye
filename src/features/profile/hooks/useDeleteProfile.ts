import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfile as deleteProfileApi } from "../services/apiProfile";
import toast from "react-hot-toast";
import { logout } from "../../auth/services/apiAuth";

const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProfile, isPending: isDeleting } = useMutation({
    mutationFn: deleteProfileApi,
    onSuccess: (data) => {
      if (data.message) toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      logout(); // Logout after deleting account
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { deleteProfile, isDeleting };
};

export { useDeleteProfile };
