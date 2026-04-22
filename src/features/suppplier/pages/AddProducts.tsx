import { useState, useRef } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProducts } from "../hooks/useAddProducts";
import { useCategory } from "../../../hooks/useCategory";
import {
  createProductItemSchema,
  type createProductItemT,
} from "../../../schemas/supplierSchema";
import type { categoryT } from "../../../schemas/categorySchema";
import { BsPencil, BsTrash } from "react-icons/bs";
import Input from "../../auth/ui/Input";
import Button from "../../../ui/Button";
import CustomSelect from "../../../ui/CustomSelect";

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

const AddProducts = () => {
  const { addProduct, isAdding } = useAddProducts();
  const { categories, isFetchingCategories } = useCategory();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createProductItemT>({
    resolver: zodResolver(createProductItemSchema),
    defaultValues: { stockQuantity: 1, imageFiles: [] },
  });

  const quantity = useWatch({ control, name: "stockQuantity" });
  const imageFiles = useWatch({ control, name: "imageFiles" });

  // ── Image helpers ─────────────────────────────────────────────────────────
  const handleImageFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const current: File[] = imageFiles ?? [];
    setValue("imageFiles", [...current, ...newFiles], { shouldValidate: true });
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => {
      setActiveImageIndex(prev.length);
      return [...prev, ...newPreviews];
    });
  };

  const removeImage = (idx: number) => {
    const current: File[] = imageFiles ?? [];
    setValue(
      "imageFiles",
      current.filter((_, i) => i !== idx),
      { shouldValidate: true },
    );
    URL.revokeObjectURL(imagePreviews[idx]);
    const next = imagePreviews.filter((_, i) => i !== idx);
    setImagePreviews(next);
    setActiveImageIndex(Math.max(0, idx - 1));
  };

  const onSubmit = (values: createProductItemT) => {
    addProduct(
      {
        products: [
          {
            name: values.name,
            description: values.description ?? "",
            categoryId: values.categoryId,
            price: values.price,
            stockQuantity: values.stockQuantity,
            expiryDate: values.expiryDate ?? "",
            imageFiles: values.imageFiles,
          },
        ],
      },
      {
        onSuccess: () => {
          reset();
          setImagePreviews([]);
          setActiveImageIndex(0);
        },
      },
    );
  };

  return (
    <>
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h2 className="text-xl font-semibold tracking-wide text-white">
          Adding New Product
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                register={register}
                name="name"
                placeholder="Product Name"
                label="Product Name"
                className="mb-0!"
                error={errors.name?.message}
              />
            </div>

            <div>
              <p className="mx-2 mb-1.5 text-gray-600">Category</p>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={
                      categories?.data?.map((cat: categoryT) => ({
                        value: cat.id.toString(),
                        label: cat.name,
                      })) || []
                    }
                    value={field.value?.toString() || ""}
                    onChange={(val) => field.onChange(Number(val))}
                    placeholder={isFetchingCategories ? "Loading…" : "Category"}
                  />
                )}
              />
              <FieldError message={errors.categoryId?.message} />
            </div>

            <div>
              <p className="mx-2 mb-1.5 text-gray-600">Price</p>
              <div className="flex">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="Price"
                      className={[
                        "flex-1 rounded-l-xl border border-r-0 bg-white px-4 py-2.5 text-sm",
                        "text-gray-800 placeholder-gray-400 transition-colors outline-none",
                        "focus:ring-primary/30 focus:ring-2",
                        errors.price
                          ? "border-red-400"
                          : "focus:border-primary border-gray-200",
                      ].join(" ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseFloat(e.target.value),
                        )
                      }
                    />
                  )}
                />
                <span className="flex shrink-0 items-center rounded-r-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-500">
                  EGP
                </span>
              </div>
              <FieldError message={errors.price?.message} />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="mx-2 w-24 shrink-0 text-gray-600">
                  Quantity
                </span>
                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "stockQuantity",
                        Math.max(1, (quantity ?? 1) + 1),
                        {
                          shouldValidate: true,
                        },
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center bg-gray-50 text-sm font-bold text-gray-700 transition-colors hover:bg-emerald-50"
                  >
                    +
                  </button>
                  <Controller
                    name="stockQuantity"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min={1}
                        className="h-9 w-12 [appearance:textfield] border-x border-gray-200 text-center text-sm outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? 1
                              : parseInt(e.target.value, 10),
                          )
                        }
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "stockQuantity",
                        Math.max(1, (quantity ?? 1) - 1),
                        {
                          shouldValidate: true,
                        },
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center bg-gray-50 text-sm font-bold text-gray-700 transition-colors hover:bg-emerald-50"
                  >
                    −
                  </button>
                </div>
              </div>
              <FieldError message={errors.stockQuantity?.message} />
            </div>
            <div>
              <Input
                type="date"
                register={register}
                name="expiryDate"
                error={errors.expiryDate?.message}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative flex aspect-4/3 w-4/5 items-center justify-center overflow-hidden rounded-xl border border-gray-400 bg-gray-100">
              {imagePreviews.length > 0 ? (
                <>
                  <img
                    src={imagePreviews[activeImageIndex]}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-sm shadow transition-colors hover:bg-white"
                      title="Add images"
                    >
                      <BsPencil />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(activeImageIndex)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-sm shadow transition-colors hover:bg-red-600"
                      title="Remove image"
                    >
                      <BsTrash color="white" />
                    </button>
                  </div>
                  {/* Dots */}
                  {imagePreviews.length > 1 && (
                    <div className="absolute right-0 bottom-2 left-0 flex justify-center gap-1.5">
                      {imagePreviews.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImageIndex(i)}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            i === activeImageIndex
                              ? "bg-primary"
                              : "bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-400">No image</span>
              )}
            </div>

            <Button
              btnLabel="+ Upload Image"
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="hover:bg-primary/10! border-2! bg-transparent!"
            />

            {errors.imageFiles && (
              <p className="text-center text-xs text-red-500">
                {errors.imageFiles.message as string}
              </p>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImageFiles(e.target.files)}
            />
          </div>
        </div>

        <div className="px-6">
          <textarea
            {...register("description")}
            placeholder="Product Description.."
            rows={4}
            className="focus:ring-primary/30 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 font-[inherit] text-sm text-gray-800 placeholder-gray-400 transition-colors outline-none focus:border-emerald-600 focus:ring-2"
          />
        </div>

        <div className="flex justify-center px-6 py-5">
          <Button
            type="submit"
            disabled={isAdding}
            btnLabel={isAdding ? "Saving…" : "Done"}
            className="w-full!"
          />
        </div>
      </form>
    </>
  );
};

export default AddProducts;
