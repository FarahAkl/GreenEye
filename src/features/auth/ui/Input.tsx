import { useState } from "react";
import type {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  prefix?: React.ReactNode;
  type?: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  accept?: string;
}

function Input<T extends FieldValues>({
  name,
  placeholder,
  register,
  rules,
  prefix,
  value,
  label,
  disabled,
  type = "text",
  error,
  accept,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`mb-4 flex flex-col gap-2`}>
      {label && <p className="text-gray-600 px-3">{label}</p>}
      <div
        className={`border-gray-300 bg-white/50 ${error ? "border-2 border-red-600" : ""} ${disabled ? "bg-gray-50 text-gray-400" : ""} focus-within:border-primary focus-within:ring-primary flex items-center rounded-3xl border px-3 py-2.5 focus-within:ring-1`}
      >
        {prefix && (
          <span className="pointer-events-none mx-3 flex items-center text-gray-400">
            {prefix}
          </span>
        )}

        <input
          id={String(name)}
          defaultValue={value}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          placeholder={placeholder}
          accept={accept}
          {...register?.(name, rules)}
          className={`block w-full rounded-md p-1 placeholder-gray-400 placeholder:text-sm focus:outline-none`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
