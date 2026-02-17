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

const ResetPassword = () => {
  const location = useLocation();
  const prevData = location.state.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordT>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: prevData.email,
      newPassword: "",
    },
  });

  const { resetPassword, isReseting } = useResetPassword();

  const onSubmit = (data: resetPasswordT) => {
    const resetData = { ...prevData, ...data };
    resetPassword(resetData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input
          label={"Email"}
          placeholder={"Email"}
          type="text"
          prefix={<GoLock size={18} />}
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <Input
          label={"Password"}
          placeholder={"Password"}
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
