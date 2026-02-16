import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { errorT, verifyOtpT } from "../../../schemas/authSchema";
import { veriftOTP as veriftOTPapi } from "../services/apiOTP";

interface IProps {
  from: "signup" | "forget-password" | "verify-email";
}

export const useOTP = ({ from }: IProps) => {
  const navigate = useNavigate();

  const { mutate: verifyOTP, isPending: isValidating } = useMutation({
    mutationFn: (data: verifyOtpT) => veriftOTPapi(data),

    onSuccess: (data, variables: verifyOtpT) => {
      toast.success(data.message);

      const redirectUrl = sessionStorage.getItem("redirectAfterLogin");

      if (from === "signup") {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/login");
        }
      }
      if (from === "verify-email") navigate("/login");
      if (from === "forget-password")
        navigate("/reset-password", { state: variables });
    },

    onError: (err: errorT) => {
      if ("message" in err) toast.error(err.message);
    },
  });

  return { verifyOTP, isValidating };
};


