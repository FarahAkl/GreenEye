import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";

import OTPInput from "../ui/OTPInput";
import { verifyOtpSchema, type verifyOtpT } from "../../../schemas/authSchema";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { useOTP } from "../hooks/useOTP";
import useResendOTP from "../hooks/useResendOTP";
import { GoLocation } from "react-icons/go";

const OTP = () => {
  const location = useLocation();
  const email = location.state?.email;
  const from = location.state?.from;

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<verifyOtpT>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: email ?? "",
      code: "",
      type: from === "forget-password" ? "ResetPassword" : "EmailVerification",
    },
  });

  const { verifyOTP, isValidating } = useOTP({ from });

  const { resendOtp } = useResendOTP();

  const onSubmit = (data: verifyOtpT) => {
    verifyOTP(data);
  };

  return (
    <>
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3 text-dark">
          <GoLocation size={26}/>
          <h1 className="text-dark text-3xl font-semibold">Verify OTP</h1>
        </div>

        <p className="max-w-sm leading-relaxed text-gray-600">
          Please enter the verification code sent to your email. If you don’t
          see it, check your spam folder.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8">
          <OTPInput
            length={6}
            setOtp={(otpArr) => setValue("code", otpArr.join(""))}
          />
          {errors.code && (
            <p className="my-3 text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary mt-5 mb-2 h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
        >
          {isValidating ? <SpinnerBtn /> : "Continue"}
        </button>
      </form>
      <div className="my-2 flex w-full justify-center gap-1 text-center text-sm">
        <span className="text-gray-600">Not in inbox or spam folder?</span>
        <button
          type="button"
          onClick={() => {
            resendOtp({
              data: {
                email,
                type:
                  from === "forget-password"
                    ? "ResetPassword"
                    : "EmailVerification",
              },
            });
          }}
          className="text-primary"
        >
          Resend
        </button>
      </div>
    </>
  );
};

export default OTP;
