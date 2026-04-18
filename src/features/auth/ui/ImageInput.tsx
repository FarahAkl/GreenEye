import { useEffect, useMemo } from "react";
import { CgImage } from "react-icons/cg";
import {
  useWatch,
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
  type FieldError,
  type Path,
} from "react-hook-form";
import type { registerT } from "../../../schemas/authSchema";

interface ImageInputProps {
  /** Field name — must be a FileList-typed key of registerT */
  name: Extract<Path<registerT>, "imageFile" | "logoFile">;
  label: string;
  hint?: string;
  error?: FieldError | { message?: string };
  register: UseFormRegister<registerT>;
  control: Control<registerT>;
  setValue: UseFormSetValue<registerT>;
}

const ImageInput = ({
  name,
  label,
  hint = "JPG, PNG or WEBP · one image",
  error,
  register,
  control,
  setValue,
}: ImageInputProps) => {
  const inputId = `register-${name}`;

  const fileList = useWatch({ control, name });
  const selectedFile =
    fileList && (fileList as FileList).length > 0
      ? (fileList as FileList)[0]
      : undefined;

  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-2 flex-1">
      <span className="px-2 font-medium text-gray-600">{label}</span>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const { files } = e.dataTransfer;
          if (files.length > 0) {
            setValue(name, files, { shouldValidate: true });
          }
        }}
        className={`group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-10 transition ${
          error
            ? "border-red-400 bg-red-50/40"
            : "hover:border-primary/45 hover:from-primary/6 border-gray-200 bg-linear-to-b from-gray-50/90 to-white hover:shadow-sm"
        }`}
      >
        {previewUrl && selectedFile ? (
          <>
            <div className="relative w-full max-w-xs">
              <img
                src={previewUrl}
                alt={`Selected ${label.toLowerCase()} preview`}
                className="mx-auto h-44 w-full rounded-xl object-cover shadow-md ring-1 ring-black/5"
              />
            </div>
            <p className="text-primary text-sm font-medium underline-offset-2 group-hover:underline">
              Choose a different image
            </p>
          </>
        ) : (
          <>
            <div className="bg-primary/12 text-primary group-hover:bg-primary/18 flex h-16 w-16 items-center justify-center rounded-2xl transition">
              <CgImage size={32} />
            </div>
            <div className="text-center">
              <p className="text-dark font-semibold">
                Tap to upload or drag a file here
              </p>
              <p className="mt-1 text-xs text-gray-500">{hint}</p>
            </div>
            <span className="bg-primary rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:brightness-110">
              Browse files
            </span>
          </>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          {...register(name)}
        />
      </label>
      {error?.message && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default ImageInput;
