import { useMutation } from "@tanstack/react-query";
import { setCookie } from "../utils/TS-Cookie";
import { login as APILogin } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import type { loginT, LoginSuccessT, errorT } from "../schemas/authSchema";

const useLogin = () => {
  const { setUser } = useAuth();

  const { mutate: login, isPending: isLogin } = useMutation<
    LoginSuccessT,
    errorT,
    loginT
  >({
    mutationFn: (data: loginT) => APILogin(data),

    onSuccess: (data) => {
      if (!data.isSuccess || !data.data) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setUser(data.data);

      if (data.data.accessToken) {
        setCookie({
          name: "token",
          value: data.data.accessToken,
          days: 14,
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
