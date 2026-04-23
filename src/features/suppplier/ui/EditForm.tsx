import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Input from "../../auth/ui/Input";
import ImageInput from "../../../ui/ImageInput";
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

const EditForm = ({
  product,
  onCloseModal,
  onSave,
  isUpdating,
}: EditFormProps) => {
  const [step, setStep] = useState<1 | 2>(1);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    setValue,
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

  // const imageFile = useWatch({
  //   control,
  //   name: "imageFile",
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? "bg-primary" : "bg-[#e0f0e9]"}`}
        />
        <div
          className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? "bg-primary" : "bg-[#e0f0e9]"}`}
        />
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
              className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-colors hover:bg-[#034415]"
            >
              Next Step <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-[fadeIn_0.3s_ease]">
          <div className="space-y-2">
            <ImageInput
              name="imageFile"
              label="Update Product Image (Optional)"
              register={register}
              control={control}
              setValue={setValue}
              hint="JPG, PNG or WEBP · will replace old image"
            />
            <p className="mt-2 text-xs text-[#7a9e8e]">
              If you don't select an image, the current product image will be
              kept.
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
};

export default EditForm;
