import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { registerSuccessT, resendOtpT } from "../../../schemas/authSchema";
import { resendOTP } from "../services/apiOTP";

const useResendOTP = () => {
  const navigate = useNavigate();
  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: (variables: { data: resendOtpT; from?: string }) =>
      resendOTP(variables.data),
    onSuccess: (data: registerSuccessT, variables) => {
      toast.success(data.message);
      if (variables.from === "verify-email")
        navigate("/verify-otp", {
          state: { from: variables.from, email: variables.data.email },
        });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  return { resendOtp, isResending };
};

export default useResendOTP;
