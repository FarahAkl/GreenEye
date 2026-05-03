import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Input from "../../auth/ui/Input";
import ImageInput from "../../../ui/ImageInput";
import type { updateProductT } from "../../../schemas/supplierSchema";
import Button from "../../../ui/Button";
import DateInput from "../../../ui/DateInput";

interface SupplierProduct {
  productId: number;
  price: number;
  name: string;
  description?: string | null;
  quantity: number;
  expiryDate?: string | null;
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
  const defaultImageUrl =
    product.imageURL && !product.imageURL.startsWith("http")
      ? `${import.meta.env.VITE_API_URL}/${product.imageURL}`
      : product.imageURL;
  const defaultExpiryDate = product.expiryDate
    ? product.expiryDate.split("T")[0]
    : null;

  const {
    control,
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<updateProductT>({
    defaultValues: {
      Name: product.name,
      Description: product.description ?? "",
      Price: product.price,
      StockQuantity: product.quantity,
      ExpiryDate: defaultExpiryDate,
    },
  });

  const onSubmit = (data: updateProductT) => {
    onSave(product.productId, data);
    onCloseModal?.();
  };

  const handleNextStep = async () => {
    const isValid = await trigger([
      "Name",
      "Description",
      "Price",
      "StockQuantity",
      "ExpiryDate",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? "bg-primary" : "bg-border-green"}`}
        />
        <div
          className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? "bg-primary" : "bg-border-green"}`}
        />
      </div>

      {step === 1 && (
        <div className="animate-[fadeIn_0.3s_ease]">
          <Input<updateProductT>
            name="Name"
            label="Product Name"
            placeholder="Enter product name"
            register={register}
            rules={{ required: "Name is required" }}
            error={errors.Name?.message}
          />

          <Input<updateProductT>
            name="Description"
            label="Description"
            placeholder="Enter description"
            register={register}
            error={errors.Description?.message}
          />

          <Input<updateProductT>
            name="Price"
            label="Price (EGP)"
            type="number"
            placeholder="0"
            register={register}
            rules={{
              required: "Price is required",
              min: { value: 0.01, message: "Must be greater than 0" },
              valueAsNumber: true,
            }}
            error={errors.Price?.message}
          />

          <Input<updateProductT>
            name="StockQuantity"
            label="Stock Quantity"
            type="number"
            placeholder="0"
            register={register}
            rules={{
              required: "Stock quantity is required",
              min: { value: 0, message: "Cannot be negative" },
              valueAsNumber: true,
            }}
            error={errors.StockQuantity?.message}
          />

          <DateInput<updateProductT>
            name="ExpiryDate"
            control={control}
            label="Expiry Date"
            error={errors.ExpiryDate?.message}
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
              className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-colors hover:bg-dark-hover"
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
              name="ImageFile"
              label="Update Product Image (Optional)"
              defaultPreviewUrl={defaultImageUrl}
              register={register}
              control={control}
              setValue={setValue}
              hint="JPG, PNG or WEBP · will replace old image"
            />
            <p className="mt-2 text-xs text-light-green">
              If you don't select an image, the current product image will be
              kept.
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-green px-4 py-3 font-semibold text-muted-green transition-colors hover:bg-pale-green"
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
