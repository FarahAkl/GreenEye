import { FaStar } from "react-icons/fa";
import type { productsT } from "../../../schemas/productsSchema";
import { CgAdd } from "react-icons/cg";

const ProductCard = (product: productsT) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const {
    name,
    price,
    primaryImageUrl: image,
    categoryName,
    averageRating,
    reviewCount,
  } = product;
  return (
    <div className="w-80 overflow-hidden rounded-2xl bg-white shadow-md">
      {/* Image Section */}
      <div className="relative">
        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="h-56 w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-2 p-4">
        <h3 className="text-dark text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{categoryName}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <FaStar className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm text-gray-700">
            {averageRating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price + Add Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-dark text-xl font-semibold">
            {price} EGP{" "}
            <span className="text-sm font-normal text-gray-500">/ unit</span>
          </div>

          <button
            onClick={() => {}}
            className="bg-dark/20 text-dark rounded-full p-3 transition hover:bg-green-200"
          >
            <CgAdd className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
