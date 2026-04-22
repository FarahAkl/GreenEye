import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import EditForm from "./EditForm";
import type { updateProductT } from "../../../schemas/supplierSchema";
import Modal from "../../../ui/Modal";

const BASE_URL = import.meta.env.VITE_API_URL;

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

interface ProductRowProps {
  product: SupplierProduct;
  index: number;
  isDeleting: boolean;
  isUpdating: boolean;
  onDelete: (id: string) => void;
  onSave: (id: number, data: updateProductT) => void;
}

const ProductRow = ({
  product,
  index,
  isDeleting,
  isUpdating,
  onDelete,
  onSave,
}: ProductRowProps) => {
  const [imgError, setImgError] = useState(false);
  const inStock = product.quantity > 0;

  // Handle relative image paths
  const imageSrc =
    product.imageURL && !product.imageURL.startsWith("http")
      ? `${BASE_URL}/${product.imageURL}`
      : product.imageURL;

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{ animation: `fadeSlideIn 0.35s ease ${index * 60}ms both` }}
    >
      {/* Thumbnail */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50">
        {!imgError && imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <BsBoxSeam className="text-2xl text-gray-300" />
          </div>
        )}
      </div>

      {/* Name & Supplier */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-gray-900">
          {product.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-gray-400">
          {product.supplierName}
        </p>
      </div>

      {/* Stock */}
      <div className="min-w-30">
        <p className="mb-1 text-xs text-gray-500">
          Stock{" "}
          <span className="font-bold text-gray-800">{product.quantity}</span>
        </p>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
            inStock ? "text-primary" : "text-red-600"
          }`}
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              inStock ? "bg-primary" : "bg-red-500"
            }`}
            style={{
              boxShadow: inStock ? "0 0 0 3px #bbf7d0" : "0 0 0 3px #fee2e2",
            }}
          />
          {inStock ? "In-stock" : "Out of stock"}
        </span>
      </div>

      {/* Price & Badge */}
      <div className="min-w-27 text-right">
        <p className="text-dark text-xl font-semibold tracking-tight">
          {product.price}{" "}
          <span className="text-sm font-semibold text-gray-400">EGP</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="ml-2 flex shrink-0 flex-col gap-1.5">
        {/* Delete */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:scale-105 hover:bg-red-500 hover:text-white active:scale-95"
          title="Delete product"
          disabled={isDeleting}
          onClick={() => onDelete(product.productId.toString())}
        >
          <FiTrash2 size={14} />
        </button>

        {/* Edit + Quick-add */}
        <div className="flex gap-1.5">
          <Modal>
            <Modal.Open opens={`edit-${product.productId}`}>
              <button
                className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all hover:scale-105 hover:text-white active:scale-95"
                title="Edit product"
              >
                <FiEdit2 size={13} />
              </button>
            </Modal.Open>
            <Modal.Window
              name={`edit-${product.productId}`}
              icon={<RiEditBoxLine size={22} className="text-primary" />}
              title="Edit Product"
              description="Update the product details below."
            >
              <EditForm
                product={product}
                onSave={onSave}
                isUpdating={isUpdating}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
