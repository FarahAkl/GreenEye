import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile as updateProfileApi,
} from "../services/apiProfile";
import toast from "react-hot-toast";
import type { updateProfileT } from "../../../schemas/profileSchema";

const useProfile = () => {
  const queryClient = useQueryClient();
  const { data: profileData, isError: getProfileError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: updateProfileT) => updateProfileApi(data),
    onSuccess: (data) => {
      if (data.message) toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { profileData, updateProfile, isUpdating, getProfileError };
};

export { useProfile };
