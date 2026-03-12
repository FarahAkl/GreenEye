import { useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useCart } from "../hooks/useCart";
import useDebounce from "../../../hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import type { itemT, updateItemInCartT } from "../../../schemas/cartSchema";
import { updateItemInCartSchema } from "../../../schemas/cartSchema";
import { IoTrashOutline } from "react-icons/io5";
import Counter from "../../../ui/Counter";

const BASE_URL = import.meta.env.VITE_API_URL;

const CartItem = ({ item }: { item: itemT }) => {
  const { id, productName, productImage, unitPrice, quantity, availableStock } =
    item;

  const { updateItemQuantity, deleteItemInCart, isDeleting } = useCart();

  const { control } = useForm<updateItemInCartT>({
    resolver: zodResolver(updateItemInCartSchema),
    defaultValues: { quantity },
  });

  const watchedQty = useWatch({
    control,
    name: "quantity",
    defaultValue: quantity,
  });
  const debouncedQty = useDebounce(watchedQty, 1000);

  useEffect(() => {
    if (debouncedQty === undefined || debouncedQty === quantity) return;
    updateItemQuantity({
      cartItemId: String(id),
      data: { quantity: debouncedQty },
    });
  }, [debouncedQty]);

  return (
    <div className="relative flex items-center gap-4 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-gray-100">
      <div className="h-full w-58 shrink-0 overflow-hidden rounded-xl">
        <img
          src={
            productImage
              ? `${BASE_URL}${productImage}`
              : "/images/productDefault.jpg"
          }
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 p-3 text-gray-600">
        <p className="line-clamp-2 text-2xl leading-snug font-semibold">
          {productName}
        </p>
        <p>From SuperSupplier</p>
        <p className="font-bold">Fertilizer</p>
        <p className="text-dark text-lg">
          {unitPrice} EGP <span className="text-sm text-gray-600">/ Item</span>
        </p>
        <div className="my-5 flex items-center gap-10">
          <div className="w-50">
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Counter
                  initialValue={field.value}
                  min={1}
                  max={availableStock}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>

          <p className="text-dark text-lg font-bold whitespace-nowrap">
            {unitPrice * watchedQty} EGP
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 p-3">
        <button
          onClick={() => deleteItemInCart(String(id))}
          disabled={isDeleting}
          className="text-red-400 transition hover:text-red-600 disabled:opacity-50"
          aria-label="Remove item"
        >
          <IoTrashOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
