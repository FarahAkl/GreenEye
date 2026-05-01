import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/TS-Cookie";
import { login as APILogin } from "../services/apiAuth";
import type { loginT } from "../../../schemas/authSchema";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const useLogin = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: (data: loginT) => APILogin(data),

    onSuccess: (data) => {
      if (!data.isSuccess || !data.data) {
        toast.error(data.message);
        return;
      }

      const userData = data.data;
      authLogin(userData);

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

      // Redirect based on role
      const lowerRoles = userData.roles.map((r) => r.toLowerCase());
      if (lowerRoles.includes("admin")) {
        navigate("/admin-dashboard", { replace: true });
      } else if (lowerRoles.includes("supplier")) {
        navigate("/supplier-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },

    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return { login, isLogin };
};

export default useLogin;
