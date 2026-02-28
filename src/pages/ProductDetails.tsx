import { useParams } from "react-router-dom";
import { useGetProductById } from "../features/products/hooks/useGetProductById";
import Spinner from "../ui/Spinner";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ?? "";

  const { productDetails, isFetchingProduct } = useGetProductById(productId);

  const productData = productDetails?.data;

  // const {
  //   name,
  //   description,
  //   price,
  //   stockQuantity,
  //   productionDate,
  //   expiryDate,
  //   primaryImageUrl,
  //   isAvailable,
  //   categoryId,
  //   categoryName,
  //   userId,
  //   userName,
  //   averageRating,
  //   reviewCount,
  //   additionalImages,
  // } = productData;

  if (isFetchingProduct)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <img
          src={`${BASE_URL}${productData.primaryImageUrl}`}
          alt={productData.name}
        />
      </div>
      <div>{productData.name}</div>
    </div>
  );
};

export default ProductDetails;
