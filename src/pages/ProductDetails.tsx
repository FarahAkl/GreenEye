import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../features/products/hooks/useGetProductById";
import Spinner from "../ui/Spinner";
import { FaStar } from "react-icons/fa";
import Counter from "../ui/Counter";
import Button from "../ui/Button";
import { IoCartOutline } from "react-icons/io5";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../features/cart/hooks/useCart";
import {
  addItemToCartSchema,
  type addItemToCartT,
} from "../schemas/cartSchema";
import SEO from "../ui/SEO";

const BASE_URL = import.meta.env.VITE_API_URL;
const formatApiDate = (value?: string | null) => {
  if (!value) return "N/A";
  return value.split("T")[0];
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ?? "";
  const navigate = useNavigate();

  const { productDetails, isFetchingProduct, isError } =
    useGetProductById(productId);
  const { addItemToCart, isAddingToCart } = useCart();

  const productData = productDetails?.data || {};

  const {
    name,
    description,
    price,
    stockQuantity,
    productionDate,
    expiryDate,
    primaryImageUrl,
    categoryName,
    userName,
    averageRating,
  } = productData;

  const { control, handleSubmit } = useForm<addItemToCartT>({
    resolver: zodResolver(addItemToCartSchema),
    defaultValues: {
      productId: Number(productId),
      quantity: 1,
    },
  });

  const quantity = useWatch({ control, name: "quantity" }) ?? 1;

  const onSubmit = (data: addItemToCartT) => {
    addItemToCart(data);
  };

  if (isFetchingProduct)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError || !productDetails?.isSuccess || !productDetails?.data)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <img
          src="/images/productDefault.jpg"
          alt=""
          className="h-40 w-40 rounded-full object-cover opacity-40"
        />
        <p className="text-dark text-2xl font-semibold">Product Not Found</p>
        <p className="text-sm text-gray-500">
          {productDetails?.message ||
            "This product doesn't exist or has been removed."}
        </p>
        <Button
          btnLabel="Back to Marketplace"
          variant="filled"
          color="primary"
          onClick={() => navigate("/marketplace")}
        />
      </div>
    );

  const totalStars = Math.round(averageRating);

  return (
    <div className="flex flex-col gap-10 px-8 py-20 md:px-12 lg:px-24">
      <SEO title={name} description={description} />
      <img
        src="/images/productsBg.webp"
        alt=""
        className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-6"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="h-100 overflow-hidden rounded-2xl">
            <img
              src={
                primaryImageUrl
                  ? `${BASE_URL}${primaryImageUrl}`
                  : "/images/productDefault.jpg"
              }
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-dark text-5xl font-bold">{name}</p>
            <p className="mt-4 text-sm font-semibold text-gray-700">
              From {userName || "GreenEye"}
            </p>
            <p className="text-sm text-gray-700">{categoryName}</p>

            {averageRating > 0 && (
              <div className="flex gap-2">
                <p>{averageRating}</p>
                <div className="flex gap-0.5">
                  {Array(totalStars)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar size={16} key={i} className="text-yellow-500" />
                    ))}
                </div>
              </div>
            )}

            <p className="text-dark mt-4 text-4xl font-semibold">{price} EGP</p>

            <p className="font-semibold text-gray-600">Quantity:</p>
            <div className="grid grid-cols-2 items-center gap-6">
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Counter
                    initialValue={field.value}
                    min={1}
                    max={stockQuantity}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
              <div className="flex gap-3">
                <span className="text-dark font-semibold">Total Price:</span>
                <span className="text-gray-600">
                  {(price * quantity).toFixed(2)} EGP
                </span>
              </div>
            </div>

            <div>
              <Button
                btnLabel=""
                type="submit"
                disabled={isAddingToCart}
                className="mt-5 flex w-full items-center justify-center gap-5"
              >
                <IoCartOutline size={24} />
                <p>{isAddingToCart ? "Adding..." : "Add to Cart"}</p>
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-dark text-3xl">Product details</p>
        <p className="text-dark my-3 text-2xl">Description</p>
        <p className="text-lg text-gray-600">{description}</p>
        <div className="my-3 flex items-center gap-5">
          <p className="text-dark text-2xl">Production Date:</p>
          <p className="text-lg text-gray-600">
            {formatApiDate(productionDate)}
          </p>
        </div>
        <div className="my-3 flex items-center gap-5">
          <p className="text-dark text-2xl">Expiry Date:</p>
          <p className="text-lg text-gray-600">{formatApiDate(expiryDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
