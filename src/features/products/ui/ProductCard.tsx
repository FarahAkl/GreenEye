import { FaStar } from "react-icons/fa";
import type { productsT } from "../../../schemas/productsSchema";
import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/hooks/useCart";
import LazyImage from "../../../ui/LazyImage";

const ProductCard = (product: productsT) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const {
    id,
    name,
    price,
    primaryImageUrl: image,
    categoryName,
    averageRating,
    reviewCount,
  } = product;
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-56 bg-gray-50">
        <LazyImage
          src={image ? `${BASE_URL}${image}` : null}
          alt={name}
          className="h-full w-full object-contain"
          iconSize={48}
        />
      </div>

      {/* Content Section */}
      <div
        className="flex flex-1 cursor-pointer flex-col gap-2 p-4"
        onClick={() => navigate(`/product/${id}`)}
      >
        <h3 className="text-dark min-h-14 text-lg font-semibold">{name}</h3>
        <p className="min-h-5 text-sm text-gray-500">{categoryName}</p>

        {/* Rating */}
        <div className="min-h-5 flex items-center gap-2">
          <FaStar className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm text-gray-700">
            {averageRating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price + Add Button */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-dark text-xl font-semibold">
            {price} EGP{" "}
            <span className="text-sm font-normal text-gray-500">/ unit</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addItemToCart({ productId: id, quantity: 1 });
            }}
            className="bg-dark/20 text-dark hover:bg-dark/35 rounded-full p-3 transition"
          >
            <CgAdd className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
