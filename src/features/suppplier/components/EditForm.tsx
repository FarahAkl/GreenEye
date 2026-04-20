import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateProductT>({
    defaultValues: {
      name: product.name,
      description: "",
      price: product.price,
      stockQuantity: product.quantity,
      expiryDate: "",
      imageFile: product.imageURL,
    },
  });

  const onSubmit = (data: updateProductT) => {
    onSave(product.productId, data);
    onCloseModal?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full max-w-md">
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
          min: { value: 1, message: "Must be greater than 0" },
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
        <Button
          btnLabel={isUpdating ? "Saving…" : "Save Changes"}
          variant="filled"
          color="primary"
          fullWidth
          type="submit"
          disabled={isUpdating}
        />
      </div>
    </form>
  );
}

export default EditForm;
