import { useGetPendingProducts } from "../hooks/useGetPendingProducts";
import { useApproveProduct } from "../hooks/useApproveProduct";
import { useRejectProduct } from "../hooks/useRejectProduct";
import { LuCalendar, LuCheck, LuCircleAlert, LuX, LuPackage } from "react-icons/lu";
import Spinner from "../../../ui/Spinner";
import type { pendingProductT } from "../../../schemas/adminSchema";
import Modal from "../../../ui/Modal";
import RejectionForm from "../ui/RejectionForm";
import { useState } from "react";
import { formatDate } from "../../../utils/date";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProductImage = ({ src, name }: { src: string; name: string }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
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

const PendingProducts = () => {
  const { pendingProducts, isFetchingProducts, isFetching } = useGetPendingProducts();
  const { approveProduct, isApproving } = useApproveProduct();
  const { rejectProduct, isRejecting } = useRejectProduct();

  if (isFetchingProducts || isFetching) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const productsList = pendingProducts?.data || [];

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Header */}
      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Pending Products
        </h1>
      </div>

      {/* Table Area */}
      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Supplier</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Quantity</th>
                <th className="px-4 py-4 font-medium">Expiry Date</th>
                <th className="px-4 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsList?.length === 0 || productsList === null ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#6b7280]">
                    No pending products found.
                  </td>
                </tr>
              ) : (
                productsList.map((product: pendingProductT) => (
                  <tr
                    key={product.id}
                    className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <ProductImage 
                          src={product.productImages?.[0] ? `${BASE_URL}${product.productImages[0]}` : ""} 
                          name={product.name} 
                        />
                        <div className="flex flex-col">
                          <span className="text-dark font-semibold">
                            {product.name}
                          </span>
                          <span className="text-xs text-gray-500 max-w-50 truncate">
                            {product.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {product.userName}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {product.categoryName}
                      </span>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {product.price} EGP
                    </td>
                    <td className="text-dark px-4 py-4 font-medium">
                      <div className="flex items-center gap-1">
                        <LuPackage size={14} className="text-gray-400" />
                        {product.quantity}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {formatDate(product.expiryDate)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          disabled={isApproving}
                          onClick={() => approveProduct(String(product.id))}
                          className="flex items-center justify-center rounded-lg bg-secondary p-1.5 text-white shadow-sm transition-colors hover:bg-secondary/80 disabled:opacity-50"
                          title="Approve"
                        >
                          <LuCheck size={18} />
                        </button>
                        
                        <Modal.Open opens={`reject-${product.id}`}>
                          <button
                            className="flex items-center justify-center rounded-lg bg-red-500 p-1.5 text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
                            title="Reject"
                          >
                            <LuX size={18} />
                          </button>
                        </Modal.Open>

                        <Modal.Window 
                          name={`reject-${product.id}`} 
                          icon={<LuCircleAlert size={24} className="text-red-500" />}
                          title="Reject Product"
                          description={`Are you sure you want to reject ${product.name}?`}
                        >
                          <RejectionForm 
                            isSubmitting={isRejecting}
                            onConfirm={(reason) => rejectProduct({ productId: String(product.id), params: { reason } })}
                            placeholder="Please explain why this product is being rejected..."
                          />
                        </Modal.Window>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default PendingProducts;
