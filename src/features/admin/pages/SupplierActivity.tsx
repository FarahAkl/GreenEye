import { useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuUser,
  LuCalendar,
  LuMail,
  LuPhone,
  LuPackage,
  LuBox,
} from "react-icons/lu";
import SEO from "../../../ui/SEO";
import { formatDate } from "../../../utils/date";
import Spinner from "../../../ui/Spinner";
import { useProfile } from "../../profile/hooks/useProfile";
import { useSupplierProducts } from "../../supplier/hooks/useSupplierProducts";
import type { productT } from "../../../schemas/supplierSchema";
import LazyImage from "../../../ui/LazyImage";
const SupplierActivity = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { profileData, isFetchingProfile } = useProfile(userId);
  const user = profileData?.data;

  const { supplierProducts, isFetchingProducts } = useSupplierProducts(
    userId || "",
  );

  const BASE_URL = import.meta.env.VITE_API_URL;

  if (isFetchingProfile || isFetchingProducts) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <p className="text-gray-500">Supplier not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary flex items-center gap-2 font-semibold hover:underline"
        >
          <LuArrowLeft size={18} /> Back to Users
        </button>
      </div>
    );
  }

  const products = supplierProducts?.data || [];

  return (
    <div className="flex flex-col gap-8 p-4">
      <SEO title={`${user.name}'s Products`} />

      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="text-dark hover:text-primary flex items-center gap-2 font-semibold transition-colors"
      >
        <LuArrowLeft size={20} />
        Back
      </button>
      <div className="bg-dark/90 rounded-2xl px-6 py-2">
        <h1 className="text-lg font-semibold text-white">Supplier Activity</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Profile Section */}
        <div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-8">
              <div className="flex shrink-0 flex-col items-center justify-between">
                <div className="border-primary/10 mb-4 h-24 w-24 overflow-hidden rounded-full border-4 bg-gray-50">
                  {user.profileImage ? (
                    <img
                      src={`${BASE_URL}${user.profileImage}`}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <LuUser className="text-gray-300" size={40} />
                    </div>
                  )}
                </div>
                <h2 className="text-dark text-center text-xl font-bold">
                  {user.name}
                </h2>
              </div>

              <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuMail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-dark font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuPhone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone Number</p>
                    <p className="text-dark font-medium">
                      {user.phoneNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuCalendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Joined At</p>
                    <p className="text-dark font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
                {user.logoImage && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                      <LuPackage size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Verification File</p>
                      <a
                        href={`${BASE_URL}${user.logoImage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:text-secondary inline-block max-w-45 truncate font-bold underline"
                      >
                        View Attachment
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shadow-inner">
                <LuBox size={22} />
              </div>
              <div>
                <h3 className="text-dark text-lg font-bold">
                  Product Inventory
                </h3>
                <p className="text-sm text-[#7a9e8e]">
                  Items listed by this supplier
                </p>
              </div>
            </div>
            <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold">
              {products.length} Items
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <LuPackage size={30} className="text-gray-300" />
              </div>
              <p className="max-w-xs text-gray-500">
                This supplier hasn't added any products yet.
              </p>
            </div>
          ) : (
            <div className="mt-5">
              {/* Mobile View: Cards */}
              <div className="space-y-4 lg:hidden">
                {products.map((product: productT) => (
                  <div
                    key={product.productId}
                    className="overflow-hidden rounded-2xl border border-[#e0f0e9] bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <LazyImage
                          src={
                            product.images && product.images[0]
                              ? `${BASE_URL}${product.images[0]}`
                              : product.imageURL
                                ? `${BASE_URL}${product.imageURL}`
                                : null
                          }
                          alt={product.name}
                          className="h-full w-full object-cover"
                          iconSize={24}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <h4 className="text-dark line-clamp-1 font-bold">
                            {product.name}
                          </h4>
                          <p className="text-primary mt-1 text-sm font-black">
                            {product.price.toLocaleString()} EGP
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Stock: {product.quantity}
                          </span>
                          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            ID: #{product.productId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-[#e0f0e9] lg:block">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#fafcfb] text-gray-600">
                    <tr className="border-b border-[#e0f0e9]">
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Product
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">ID</th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Price
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {products.map((product: productT) => (
                      <tr
                        key={product.productId}
                        className="transition-colors hover:bg-[#fcfdfc]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100">
                              <LazyImage
                                src={
                                  product.images && product.images[0]
                                    ? `${BASE_URL}${product.images[0]}`
                                    : product.imageURL
                                      ? `${BASE_URL}${product.imageURL}`
                                      : null
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                                iconSize={20}
                              />
                            </div>
                            <span className="text-dark max-w-xs truncate font-bold">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-[#7a9e8e]">
                          #{product.productId}
                        </td>
                        <td className="text-primary px-6 py-4 font-black">
                          {product.price.toLocaleString()} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                            {product.quantity} in stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierActivity;
