import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiPhone } from "react-icons/fi";
import { GoLocation, GoLock, GoPerson } from "react-icons/go";
import Input from "../ui/Input";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { registerSchema, type registerT } from "../../../schemas/authSchema";
import useSignUp from "../hooks/useRegister";
import { CgImage, CgUser } from "react-icons/cg";

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
      <p className="text-dark mt-3 mb-10 text-center text-4xl font-medium">
        SignUp
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <Input
          placeholder={"Name"}
          type="text"
          prefix={<GoPerson size={18} />}
          register={register}
          name="name"
          error={errors.name?.message}
        />
        <Input
          placeholder={"Email"}
          type="email"
          prefix={<FiMail size={18} />}
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <Input
          placeholder={"Phone"}
          type="text"
          prefix={<FiPhone size={18} />}
          register={register}
          name="phoneNumber"
          error={errors.phoneNumber?.message}
        />
        <Input
          placeholder={"Address"}
          type="text"
          prefix={<GoLocation size={18} />}
          register={register}
          name="address"
          error={errors.address?.message}
        />
        <Input
          placeholder={"Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <Input
          placeholder={"Confirm Password"}
          type="password"
          prefix={<GoLock size={18} />}
          register={register}
          name="confirmPassword"
          error={errors.confirmPassword?.message}
        />

        <Input
          placeholder={"Image"}
          type="file"
          prefix={<CgImage size={18} />}
          register={register}
          name="imageFile"
          error={errors.imageFile?.message}
        />

        <Input
          placeholder={"Rule"}
          type="text"
          prefix={<CgUser size={18} />}
          register={register}
          name="rule"
          error={errors.rule?.message}
        />

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">Have an account?</span>
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPendingSignup ? <SpinnerBtn /> : "Sign up"}
          </button>
      </form>
    </>
  );
};

export default Register;
