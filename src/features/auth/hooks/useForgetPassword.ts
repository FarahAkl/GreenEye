import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgetPassword as forgetPasswordapi } from "../services/apiPassword";
import type { forgetPasswordT } from "../../../schemas/authSchema";

const useForgetPassword = () => {
  const navigate = useNavigate();

  const { mutate: forgetPassword, isPending: isSendingOTP } = useMutation({
    mutationFn: (variables: { data: forgetPasswordT; from?: string }) =>
      forgetPasswordapi(variables.data),
    onSuccess: (data, variables) => {
      toast.success(data.message);
      if (variables.from === "forget-password")
        navigate("/verify-otp", {
          state: { from: "forget-password", email: variables.data.email },
        });
    },
    onError: (err) => toast.error(err.message.split(".")[0]),
  });

  return { forgetPassword, isSendingOTP };
};

export default useForgetPassword;
