import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin";
import { FiMail } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import Input from "../ui/Input";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { loginSchema, type loginT } from "../../../schemas/authSchema";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { login, isLogin } = useLogin();

  const onSubmit = async (data: loginT) => {
    login(data, {
      onSuccess: () => {
        navigate(redirectTo, { replace: true });
      },
    });
  };

  return (
    <>
      <p className="text-dark mt-3 mb-10 text-center text-4xl font-medium">
        Login
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          placeholder={"Email"}
          type="email"
          prefix={<FiMail size={18} />}
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <Input
          placeholder={"Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="password"
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" id="remember" {...register("rememberMe")} />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Link to="/forget-password" className="text-primary">
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLogin ? <SpinnerBtn /> : "Login"}
        </button>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">Don’t have an account?</span>
          <Link to="/signup" className="text-primary">
            SignUp
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
