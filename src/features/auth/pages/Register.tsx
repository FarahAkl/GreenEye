import { useRef, useState } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type Path,
  type UseFormSetError,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { FiMail, FiPhone } from "react-icons/fi";
import { GoLocation, GoLock, GoPerson } from "react-icons/go";
import Input from "../ui/Input";
import SpinnerBtn from "../../../ui/SpinnerBtn";
import {
  registerSchema,
  registerStep1Schema,
  type registerT,
} from "../../../schemas/authSchema";
import useSignUp from "../hooks/useRegister";
import { CgUser } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import type { ZodIssue } from "zod";
import Button from "../../../ui/Button";
import ImageInput from "../ui/ImageInput";

const ROLE_OPTIONS = [
  { value: "farmer", label: "Farmer" },
  // { value: "admin", label: "Admin" },
  { value: "supplier", label: "Supplier" },
  { value: "expert", label: "Expert" },
] as const;

const LOGO_ROLES = ["supplier", "expert"] as const;
type LogoRole = (typeof LOGO_ROLES)[number];
const requiresLogo = (role: string): role is LogoRole =>
  (LOGO_ROLES as readonly string[]).includes(role);

const applyZodIssues = (
  setError: UseFormSetError<registerT>,
  issues: ZodIssue[],
) => {
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string") {
      setError(key as Path<registerT>, {
        type: "manual",
        message: issue.message,
      });
    }
  }
};

const Register = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<registerT>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      name: "",
      rule: "farmer",
      imageFile: undefined,
      logoFile: undefined,
      phoneNumber: "",
    },
  });

  // Watch the role so step 2 can react to it
  const selectedRole = useWatch({ control, name: "rule" });
  const showLogoUpload = requiresLogo(selectedRole);

  // ── Close role dropdown on outside click ──────────────────────────────────
  // (kept as a plain effect tied to roleMenuOpen — same pattern as before)

  const { mutateSignup, isPendingSignup } = useSignUp();

  const validateStep1 = (): boolean => {
    clearErrors();
    const parsed = registerStep1Schema.safeParse(getValues());
    if (parsed.success) return true;
    applyZodIssues(setError, parsed.error.issues);
    return false;
  };

  const onFinalSubmit = (data: registerT) => {
    clearErrors();
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      applyZodIssues(setError, parsed.error.issues);
      return;
    }
    mutateSignup(parsed.data);
  };

  return (
    <>
      <p className="text-dark mt-3 mb-2 text-center text-4xl font-medium">
        SignUp
      </p>
      <p className="mb-8 text-center text-sm text-gray-500">
        Step {step} of 2{step === 1 ? " — Your details" : " — Profile image"}
      </p>
      <form
        onSubmit={
          step === 1
            ? (e) => {
                e.preventDefault();
                if (validateStep1()) {
                  setRoleMenuOpen(false);
                  setStep(2);
                }
              }
            : handleSubmit(onFinalSubmit)
        }
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {/* ── Step 1 ── */}
        {step === 1 && (
          <>
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

            {/* Role selector */}
            <div className="mb-4 flex flex-col gap-2 sm:col-span-2">
              <span className="text-sm font-medium text-gray-600">Role</span>
              <Controller
                name="rule"
                control={control}
                render={({ field }) => {
                  const selected = ROLE_OPTIONS.find(
                    (o) => o.value === field.value,
                  );
                  return (
                    <div className="relative" ref={roleMenuRef}>
                      <button
                        type="button"
                        id="register-role-trigger"
                        aria-haspopup="listbox"
                        aria-expanded={roleMenuOpen}
                        onClick={() => setRoleMenuOpen((open) => !open)}
                        className={`focus-within:ring-primary flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left transition focus-within:ring-1 focus:outline-none ${
                          errors.rule
                            ? "border-2 border-red-600"
                            : roleMenuOpen
                              ? "border-primary ring-primary ring-1"
                              : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <span className="flex min-w-0 flex-1 items-center gap-3">
                          <span className="pointer-events-none flex shrink-0 text-gray-400">
                            <CgUser size={18} />
                          </span>
                          <span className="truncate text-sm text-gray-800">
                            {selected?.label ?? "Select role"}
                          </span>
                        </span>
                        <IoChevronDown
                          className={`ml-2 shrink-0 text-gray-500 transition-transform duration-200 ${
                            roleMenuOpen ? "rotate-180" : ""
                          }`}
                          size={20}
                          aria-hidden
                        />
                      </button>
                      {roleMenuOpen && (
                        <ul
                          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
                          role="listbox"
                          aria-labelledby="register-role-trigger"
                        >
                          {ROLE_OPTIONS.map(({ value, label }) => (
                            <li
                              key={value}
                              role="option"
                              aria-selected={field.value === value}
                            >
                              <button
                                type="button"
                                className={`w-full px-4 py-2.5 text-left text-sm transition ${
                                  field.value === value
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-gray-800 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  field.onChange(value);
                                  setRoleMenuOpen(false);
                                }}
                              >
                                {label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }}
              />
              {errors.rule?.message && (
                <p className="text-sm text-red-600">{errors.rule.message}</p>
              )}
            </div>
          </>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div className="flex flex-col gap-6 sm:col-span-2">
            <p className="text-sm text-gray-600">
              Add a clear photo of yourself — it helps verify your account.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Profile image — always required */}
              <ImageInput
                name="imageFile"
                label="Profile Photo"
                hint="JPG, PNG or WEBP · one image"
                error={errors.imageFile}
                register={register}
                control={control}
                setValue={setValue}
              />

              {/* Logo — only for supplier / expert */}
              {showLogoUpload && (
                <ImageInput
                  name="logoFile"
                  label={
                    selectedRole === "expert"
                      ? "Certificate or Proof of Expertise"
                      : "Business License or Supplier Verification"
                  }
                  hint="JPG, PNG or WEBP · one image · required for your role"
                  error={errors.logoFile}
                  register={register}
                  control={control}
                  setValue={setValue}
                />
              )}
            </div>
          </div>
        )}

        {/* ── Navigation buttons ── */}
        <div className="flex flex-col gap-3 sm:col-span-2">
          {step === 1 ? (
            <button
              type="submit"
              className="bg-primary h-12 w-full cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
            >
              Continue
            </button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                variant="outline"
                btnLabel="Back"
                type="button"
                onClick={() => setStep(1)}
                disabled={isPendingSignup}
                className="h-12 w-full cursor-pointer rounded-2xl border border-gray-300 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-xs"
              />
              <Button
                btnLabel=""
                className="sm:w-1/2!"
                type="submit"
                disabled={isPendingSignup}
              >
                {isPendingSignup ? <SpinnerBtn /> : "Sign up"}
              </Button>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">Have an account?</span>
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
