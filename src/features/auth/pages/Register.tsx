import { useEffect, useMemo, useRef, useState } from "react";
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
import { CgImage, CgUser } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import type { ZodIssue } from "zod";

const ROLE_OPTIONS = [
  { value: "farmer", label: "Farmer" },
  // { value: "admin", label: "Admin" },
  { value: "supplier", label: "Supplier" },
  { value: "expert", label: "Expert" },
] as const;

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
      phoneNumber: "",
    },
  });

  const imageFileList = useWatch({ control, name: "imageFile" });
  const selectedImage =
    imageFileList && imageFileList.length > 0 ? imageFileList[0] : undefined;

  const imagePreviewUrl = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : null),
    [selectedImage],
  );

  useEffect(() => {
    if (!imagePreviewUrl) return;
    return () => URL.revokeObjectURL(imagePreviewUrl);
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (!roleMenuOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const el = roleMenuRef.current;
      if (el && !el.contains(e.target as Node)) setRoleMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [roleMenuOpen]);

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
        Step {step} of 2
        {step === 1 ? " — Your details" : " — Profile image"}
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
                              ? "border-primary ring-1 ring-primary"
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
                            <li key={value} role="option" aria-selected={field.value === value}>
                              <button
                                type="button"
                                className={`w-full px-4 py-2.5 text-left text-sm transition ${
                                  field.value === value
                                    ? "bg-primary/10 font-semibold text-primary"
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

        {step === 2 && (
          <div className="flex flex-col gap-3 sm:col-span-2">
            <p className="text-sm text-gray-600">
              Add a clear photo of yourself — it helps verify your account.
            </p>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="register-profile-image"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { files } = e.dataTransfer;
                  if (files.length > 0) {
                    setValue("imageFile", files, { shouldValidate: true });
                  }
                }}
                className={`group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-10 transition ${
                  errors.imageFile
                    ? "border-red-400 bg-red-50/40"
                    : "border-gray-200 bg-linear-to-b from-gray-50/90 to-white hover:border-primary/45 hover:from-primary/6 hover:shadow-sm"
                }`}
              >
                {imagePreviewUrl && selectedImage ? (
                  <>
                    <div className="relative w-full max-w-xs">
                      <img
                        src={imagePreviewUrl}
                        alt="Selected profile preview"
                        className="mx-auto h-44 w-full rounded-xl object-cover shadow-md ring-1 ring-black/5"
                      />
                    </div>
                    <p className="text-primary text-sm font-medium underline-offset-2 group-hover:underline">
                      Choose a different image
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary transition group-hover:bg-primary/18">
                      <CgImage size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-dark font-semibold">
                        Tap to upload or drag a file here
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG or WEBP · one image
                      </p>
                    </div>
                    <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:brightness-110">
                      Browse files
                    </span>
                  </>
                )}
                <input
                  id="register-profile-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  {...register("imageFile")}
                />
              </label>
              {errors.imageFile?.message && (
                <p className="text-sm text-red-600">{errors.imageFile.message}</p>
              )}
            </div>
          </div>
        )}

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
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isPendingSignup}
                className="h-12 w-full cursor-pointer rounded-2xl border border-gray-300 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-xs"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isPendingSignup}
                className="bg-primary h-12 w-full flex-1 cursor-pointer rounded-2xl px-5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPendingSignup ? <SpinnerBtn /> : "Sign up"}
              </button>
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
