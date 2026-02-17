import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { resetPassword as resetPasswordapi } from "../services/apiPassword";
import type { errorT, resetPasswordT } from "../../../schemas/authSchema";

const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: isReseting } = useMutation({
    mutationFn: (data: resetPasswordT) => resetPasswordapi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (err: errorT) => toast.error(err.message),
  });

  return { resetPassword, isReseting };
};

export default useResetPassword;
