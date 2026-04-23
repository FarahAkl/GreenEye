import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import { FiMail } from "react-icons/fi";
import {
  forgetPasswordSchema,
  type forgetPasswordT,
} from "../../../schemas/authSchema";
import useForgetPassword from "../hooks/useForgetPassword";
import SEO from "../../../ui/SEO";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetPasswordT>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { forgetPassword } = useForgetPassword();

  const onSubmit = (data: forgetPasswordT) => {
    forgetPassword({ data, from: "forget-password" });
  };

  return (
    <>
      <SEO title="Forget Password" description="Recover your GreenEye account access by resetting your password." />
      <p className="text-dark mt-3 mb-6 text-3xl font-medium">
        Forget Password
      </p>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"Email"}
          type="email"
          prefix={<FiMail size={18} />}
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <button
          type="submit"
          className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
