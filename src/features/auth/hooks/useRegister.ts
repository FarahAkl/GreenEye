import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../services/apiAuth";
import toast from "react-hot-toast";
import type {
  errorT,
  registerSuccessT,
  registerT,
} from "../../../schemas/authSchema";

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate: mutateSignup, isPending: isPendingSignup } = useMutation({
    mutationFn: (data: registerT): Promise<registerSuccessT> => register(data),
    onSuccess: (data, variables: registerT) => {
      console.log(data);
      toast.success(data.message || "OTP has successfully sent to your mail");
      const email = variables.email;
      navigate("/verify-otp", {
        state: {
          from: "signup",
          email,
        },
      });
    },
    onError: (error: errorT) => {
      toast.error(error.message || "Failed to sign up, try again");
    },
  });
  return { mutateSignup, isPendingSignup };
};

export default useSignUp;
