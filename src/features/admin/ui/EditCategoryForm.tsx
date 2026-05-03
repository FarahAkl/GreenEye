import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../auth/ui/Input";
import ImageInput from "../../../ui/ImageInput";
import Button from "../../../ui/Button";
import { LuChevronLeft, LuChevronRight, LuCheck } from "react-icons/lu";
import type {
  categoryT,
  createCategoryRequestT,
} from "../../../schemas/categorySchema";

interface EditCategoryFormProps {
  category: categoryT;
  onCloseModal?: () => void;
  onSave: (id: string, data: createCategoryRequestT) => void;
  isUpdating: boolean;
}

const EditCategoryForm = ({
  category,
  onCloseModal,
  onSave,
  isUpdating,
}: EditCategoryFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<createCategoryRequestT>({
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const onSubmit = (data: createCategoryRequestT) => {
    onSave(category.id.toString(), data);
    onCloseModal?.();
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await trigger(["name", "description"]);
    if (isValid) setCurrentStep(1);
  };

  const BASE_URL = import.meta.env.VITE_API_URL;
  const currentImageUrl =
    category.imageUrl && !category.imageUrl.startsWith("http")
      ? `${BASE_URL}${category.imageUrl}`
      : category.imageUrl;

  return (
    <div className="flex min-w-[min(90vw,32rem)] flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {currentStep === 0 && (
          <div className="flex animate-[fadeIn_0.3s_ease-out] flex-col gap-5">
            <Input
              type="text"
              label="Category Name"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Enter category name"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-muted-green">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Describe this category..."
                rows={4}
                className="focus:ring-primary/30 focus:border-primary w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-colors outline-none focus:ring-2"
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="flex animate-[fadeIn_0.3s_ease-out] flex-col gap-5">
            <div className="h-64">
              <ImageInput
                name="imageUrl"
                label="Category Image"
                register={register}
                control={control}
                setValue={setValue}
                defaultPreviewUrl={currentImageUrl}
                hint="JPG, PNG or WEBP · max 2MB"
              />
            </div>
            <p className="text-center text-xs text-gray-400">
              Tip: Choose a high-quality image that represents the category.
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-between border-t border-gray-100 pt-6">
          <Button
            type="button"
            btnLabel=""
            variant="outline"
            onClick={(e) => {
              e?.preventDefault();
              if (currentStep === 0) onCloseModal?.();
              else setCurrentStep(0);
            }}
            disabled={isUpdating}
            className="flex items-center gap-2 px-6"
          >
            {currentStep === 0 ? (
              "Cancel"
            ) : (
              <>
                <LuChevronLeft size={18} />
                <p>Back</p>
              </>
            )}
          </Button>

          {currentStep === 0 ? (
            <Button
              type="button"
              btnLabel="Continue"
              variant="filled"
              color="primary"
              onClick={(e) =>
                void handleNext(e as React.MouseEvent<HTMLButtonElement>)
              }
              className="flex items-center gap-2 px-8"
            >
              <LuChevronRight size={18} />
            </Button>
          ) : (
            <Button
              type="submit"
              btnLabel={isUpdating ? "Saving..." : "Save Changes"}
              variant="filled"
              color="primary"
              disabled={isUpdating}
              className="flex items-center gap-2 px-8"
            >
              <LuCheck size={18} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
