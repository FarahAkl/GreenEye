import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Input from "../../auth/ui/Input";
import type { updateProductT } from "../../../schemas/supplierSchema";
import Button from "../../../ui/Button";

interface SupplierProduct {
  productId: number;
  price: number;
  name: string;
  quantity: number;
  imageURL: string;
  supplierId: string;
  supplierLogo: string;
  supplierName: string;
  images: string[];
}

interface EditFormProps {
  product: SupplierProduct;
  onCloseModal?: () => void;
  onSave: (id: number, data: updateProductT) => void;
  isUpdating: boolean;
}

function EditForm({
  product,
  onCloseModal,
  onSave,
  isUpdating,
}: EditFormProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<updateProductT>({
    defaultValues: {
      name: product.name,
      description: "", // Description is not in SupplierProduct interface, defaulting to empty
      price: product.price,
      stockQuantity: product.quantity,
      expiryDate: "",
    },
  });

  const imageFileWatch = watch("imageFile");

  const onSubmit = (data: updateProductT) => {
    onSave(product.productId, data);
    onCloseModal?.();
  };

  const handleNextStep = async () => {
    const isValid = await trigger([
      "name",
      "description",
      "price",
      "stockQuantity",
      "expiryDate",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <div className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? 'bg-primary' : 'bg-[#e0f0e9]'}`} />
        <div className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? 'bg-primary' : 'bg-[#e0f0e9]'}`} />
      </div>

      {step === 1 && (
        <div className="animate-[fadeIn_0.3s_ease]">
          <Input<updateProductT>
            name="name"
            label="Product Name"
            placeholder="Enter product name"
            register={register}
            rules={{ required: "Name is required" }}
            error={errors.name?.message}
          />

          <Input<updateProductT>
            name="description"
            label="Description"
            placeholder="Enter description"
            register={register}
            error={errors.description?.message}
          />

          <Input<updateProductT>
            name="price"
            label="Price (EGP)"
            type="number"
            placeholder="0"
            register={register}
            rules={{
              required: "Price is required",
              min: { value: 0.01, message: "Must be greater than 0" },
              valueAsNumber: true,
            }}
            error={errors.price?.message}
          />

          <Input<updateProductT>
            name="stockQuantity"
            label="Stock Quantity"
            type="number"
            placeholder="0"
            register={register}
            rules={{
              required: "Stock quantity is required",
              min: { value: 0, message: "Cannot be negative" },
              valueAsNumber: true,
            }}
            error={errors.stockQuantity?.message}
          />

          <Input<updateProductT>
            name="expiryDate"
            label="Expiry Date"
            type="date"
            register={register}
            error={errors.expiryDate?.message}
          />

          <div className="mt-6 flex gap-3">
            <Button
              btnLabel="Cancel"
              variant="outline"
              color="secondary"
              fullWidth
              onClick={onCloseModal}
              type="button"
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-[#034415]"
            >
              Next Step <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-[fadeIn_0.3s_ease]">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#5d8a7d]">Update Product Image (Optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("imageFile", file as any, { shouldValidate: true });
                  }
                }}
              />
              <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${imageFileWatch ? 'border-primary bg-primary/5' : 'border-[#e0f0e9] bg-[#fafcfb] hover:border-primary/30 hover:bg-[#ebf5f0]'}`}>
                {imageFileWatch ? (
                  <>
                    <FiImage size={32} className="mb-2 text-primary" />
                    <span className="text-sm font-bold text-primary">Image Selected</span>
                    <span className="mt-1 text-xs text-[#5d8a7d]">{(imageFileWatch as unknown as File).name}</span>
                  </>
                ) : (
                  <>
                    <FiImage size={32} className="mb-2 text-[#7a9e8e]" />
                    <span className="text-sm font-bold text-[#1a3a2e]">Upload New Image</span>
                    <span className="mt-1 text-xs text-[#7a9e8e]">Drag & drop or click to browse</span>
                  </>
                )}
              </div>
            </div>
            {errors.imageFile && (
              <p className="mt-1 text-xs text-red-500">{errors.imageFile?.message}</p>
            )}
            <p className="mt-2 text-xs text-[#7a9e8e]">
              If you don't select an image, the current product image will be kept.
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e0f0e9] px-4 py-3 font-semibold text-[#5d8a7d] transition-colors hover:bg-[#ebf5f0]"
            >
              <FiArrowLeft /> Back
            </button>
            <Button
              btnLabel={isUpdating ? "Saving…" : "Save Changes"}
              variant="filled"
              color="primary"
              fullWidth
              type="submit"
              disabled={isUpdating}
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default EditForm;
