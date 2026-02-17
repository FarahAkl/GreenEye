import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";

import OTPInput from "../ui/OTPInput";
import { verifyOtpSchema, type verifyOtpT } from "../../../schemas/authSchema";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import { useOTP } from "../hooks/useOTP";
import useResendOTP from "../hooks/useResendOTP";

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

      <div className="my-2 flex w-full justify-center gap-1 text-center text-sm">
        <span>Didn’t recieve a code?</span>
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
          className="text-primary underline"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
};

export default OTP;
