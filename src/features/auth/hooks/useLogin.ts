import { useMutation } from "@tanstack/react-query";
import { setCookie } from "../../../utils/TS-Cookie";
import { login as APILogin } from "../services/apiAuth";
import type { loginT } from "../../../schemas/authSchema";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const useLogin = () => {
  const { login: authLogin } = useAuth();
  
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: (data: loginT) => APILogin(data),

    onSuccess: (data) => {
      if (!data.isSuccess || !data.data) {
        toast.error(data.message);
        return;
      }
      authLogin();

      toast.success(data.message || "Login Successfully");

      if (data.data.accessToken) {
        setCookie({
          name: "token",
          value: data.data.accessToken,
          days: 14,
        });
      }
      if (data.data.refreshToken) {
        setCookie({
          name: "refreshToken",
          value: data.data.refreshToken,
          days: 7,
        });
      }
    },

    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return { login, isLogin };
};

export default useLogin;
