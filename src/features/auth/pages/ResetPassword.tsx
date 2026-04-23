import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoLock } from "react-icons/go";
import useResetPassword from "../hooks/useResetPassword";

import Input from "../ui/Input";
import {
  resetPasswordSchema,
  type resetPasswordT,
} from "../../../schemas/authSchema";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { FaEnvelope } from "react-icons/fa";
import SEO from "../../../ui/SEO";

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordT>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      newPassword: "",
    },
  });

  const { resetPassword, isReseting } = useResetPassword();

  const onSubmit = (data: resetPasswordT) => {
    resetPassword(data);
  };

  return (
    <>
      <SEO title="Reset Password" description="Securely reset your GreenEye account password." />
      <p className="text-dark mt-3 mb-6 text-3xl font-medium">
        Reset Password
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="hidden">
          <Input
            placeholder={"Email"}
            type="text"
            prefix={<FaEnvelope size={18} />}
            register={register}
            name="email"
            error={errors.email?.message}
          />
        </div>
        <Input
          placeholder={"New Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="newPassword"
          error={errors.newPassword?.message}
        />
        <button
          type="submit"
          className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
        >
          {isReseting ? <SpinnerBtn /> : "Confirm"}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
