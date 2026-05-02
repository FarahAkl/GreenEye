import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuCalendar, LuPackage, LuUserRound } from "react-icons/lu";
import { formatDate } from "../../../utils/date";
import { useProducts } from "../../products/hooks/useProducts";
import type { productsT } from "../../../schemas/productsSchema";
import Spinner from "../../../ui/Spinner";
import SEO from "../../../ui/SEO";
import Pagination from "../../../ui/Pagination";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProductImage = ({ src, name }: { src: string; name: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
      {!imgError && src ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <LuPackage className="text-gray-300" size={20} />
        </div>
      )}
    </div>
  );
};

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;
  const pageSize = 10;

  const { products, isFetchingProducts } = useProducts({
    pageNumber,
    pageSize,
  });

  if (isFetchingProducts) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const productsList = products?.data?.data || [];
  const totalPages = products?.data?.totalPages || 0;

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO title="All Products" />
      {/* Header */}
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          All Products
        </h1>
      </div>

      {/* Table Area */}
      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b-2 border-gray-200 text-gray-600">
              <th className="px-4 py-4 font-medium">Product</th>
              <th className="px-4 py-4 font-medium">Supplier</th>
              <th className="px-4 py-4 font-medium">Category</th>
              <th className="px-4 py-4 font-medium">Price</th>
              <th className="px-4 py-4 font-medium">Quantity</th>
              <th className="px-4 py-4 font-medium">Expiry Date</th>
              <th className="px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {productsList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#6b7280]">
                  No products found.
                </td>
              </tr>
            ) : (
              productsList.map((product: productsT) => (
                <tr
                  key={product.id}
                  className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={
                          product.primaryImageUrl
                            ? `${BASE_URL}${product.primaryImageUrl}`
                            : ""
                        }
                        name={product.name}
                      />
                      <div className="flex flex-col">
                        <span className="text-dark font-semibold">
                          {product.name}
                        </span>
                        <span className="max-w-50 truncate text-xs text-gray-500">
                          {product.description}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {product.userId ? (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin-dashboard/users/${product.userId}/supplier-activity`,
                          )
                        }
                        className="text-primary hover:text-dark inline-flex items-center gap-2 font-semibold underline underline-offset-2 transition-colors"
                        title="View supplier activity"
                      >
                        <LuUserRound size={16} className="text-gray-400" />
                        {product.userName || "Supplier"}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-gray-500">
                        <LuUserRound size={16} className="text-gray-300" />
                        {product.userName || "Supplier"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="text-dark px-4 py-4 font-bold">
                    {product.price} EGP
                  </td>
                  <td className="text-dark px-4 py-4 font-medium">
                    <div className="flex items-center gap-1">
                      <LuPackage size={14} className="text-gray-400" />
                      {product.stockQuantity}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-dark flex items-center gap-2 font-bold">
                      <LuCalendar size={16} className="text-gray-400" />
                      {formatDate(product.expiryDate)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {product.isAvailable ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                        Unavailable
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(page) => setSearchParams({ page: page.toString() })}
        />
      )}
    </div>
  );
};

export default AllProducts;
