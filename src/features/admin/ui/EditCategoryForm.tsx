import { useForm } from "react-hook-form";
import Input from "../../auth/ui/Input";
import ImageInput from "../../../ui/ImageInput";
import Button from "../../../ui/Button";
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
  const {
    control,
    register,
    handleSubmit,
    setValue,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex min-w-87 flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          label="Category Name"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Enter category name"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#5d8a7d]">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter category description..."
            rows={3}
            className="focus:ring-primary/30 focus:border-primary w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-colors outline-none focus:ring-2"
          />
        </div>

        <div className="h-64">
          <ImageInput
            name="imageUrl"
            label="Category Image"
            register={register}
            control={control}
            setValue={setValue}
            hint="Replace the current category image"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
        <Button
          type="button"
          btnLabel="Cancel"
          variant="outline"
          onClick={onCloseModal}
          disabled={isUpdating}
        />
        <Button
          type="submit"
          btnLabel={isUpdating ? "Saving..." : "Save Changes"}
          variant="filled"
          color="primary"
          disabled={isUpdating}
        />
      </div>
    </form>
  );
};

export default EditCategoryForm;
