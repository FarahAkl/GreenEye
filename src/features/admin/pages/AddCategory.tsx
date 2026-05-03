import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../../hooks/useCategory";
import { type createCategoryRequestT } from "../../../schemas/categorySchema";
import Input from "../../auth/ui/Input";
import Button from "../../../ui/Button";
import ImageInput from "../../../ui/ImageInput";
import SEO from "../../../ui/SEO";

const AddCategory = () => {
  const navigate = useNavigate();
  const { createCategory, isCreating } = useCategory();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createCategoryRequestT>({
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (values: createCategoryRequestT) => {
    createCategory(values, {
      onSuccess: () => {
        reset();
        navigate("/admin-dashboard/categories");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <SEO title="Add New Category" />
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h2 className="text-xl font-semibold tracking-wide text-white">
          Adding New Category
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-3xl border border-border-green bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 gap-10 p-8 lg:grid-cols-2">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              label="Category Name"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Enter category name"
              className="mb-0!"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-muted-green">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Enter category description..."
                rows={5}
                className="focus:ring-primary/30 focus:border-primary w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-colors outline-none focus:ring-2"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Image Upload */}
          <div className="flex flex-col gap-4">
            <div className="h-full min-h-75">
              <ImageInput
                name="imageUrl"
                label="Category Image"
                register={register}
                control={control}
                setValue={setValue}
                hint="JPG, PNG or WEBP · This will be displayed on the marketplace"
                error={errors.imageUrl}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 border-t border-border-green bg-panel-green px-8 py-6">
          <Button
            type="button"
            btnLabel="Cancel"
            variant="outline"
            onClick={() => navigate("/admin-dashboard/categories")}
            disabled={isCreating}
            className="w-32!"
          />
          <Button
            type="submit"
            btnLabel={isCreating ? "Saving…" : "Create Category"}
            variant="filled"
            color="primary"
            disabled={isCreating}
            className="w-48!"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
