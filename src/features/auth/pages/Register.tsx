import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail } from "react-icons/fi";
import { GoLock } from "react-icons/go";
import Input from "../ui/Input";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { registerSchema, type registerT } from "../../../schemas/authSchema";
import useSignUp from "../hooks/useRegister";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerT>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      name: "",
      rule: "",
      imageFile: undefined,
      phoneNumber: "",
    },
  });

  const { mutateSignup, isPendingSignup } = useSignUp();

  const onSubmit = (data: registerT) => {
    mutateSignup(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          label={"Email"}
          placeholder={"Email"}
          type="email"
          prefix={<FiMail size={18} />}
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <Input
          label={"Name"}
          placeholder={"Name"}
          type="text"
          prefix={<FiMail size={18} />}
          register={register}
          name="name"
          error={errors.name?.message}
        />
        <Input
          label={"Address"}
          placeholder={"Address"}
          type="text"
          prefix={<FiMail size={18} />}
          register={register}
          name="address"
          error={errors.address?.message}
        />
        <Input
          label={"Phone"}
          placeholder={"Phone"}
          type="text"
          prefix={<FiMail size={18} />}
          register={register}
          name="phoneNumber"
          error={errors.phoneNumber?.message}
        />
        <Input
          label={"Password"}
          placeholder={"Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <Input
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="confirmPassword"
          error={errors.confirmPassword?.message}
        />

        <Input
          label={"Image"}
          placeholder={"Image"}
          type="file"
          prefix={<GoLock size={18} />}
          register={register}
          name="imageFile"
          error={errors.imageFile?.message}
        />

        <Input
          label={"Rule"}
          placeholder={"Rule"}
          type="text"
          prefix={<GoLock size={18} />}
          register={register}
          name="rule"
          error={errors.rule?.message}
        />

        <button
          type="submit"
          className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPendingSignup ? <SpinnerBtn /> : "Sign up"}
        </button>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-600">You have an account?</span>
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
