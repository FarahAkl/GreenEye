import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiPackage, FiChevronDown } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";

import { useSupplierProducts } from "../hooks/useSupplierProducts";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useAuth } from "../../auth/hooks/useAuth";
import type { updateProductT } from "../../../schemas/supplierSchema";

import Button from "../../../ui/Button";
import ProductRow from "../ui/ProductRow";
import SkeletonRow from "../ui/SkeletonRow";
import SEO from "../../../ui/SEO";

const SupplierProducts = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const supplierId = userId || "";

  const { supplierProducts, isFetchingProducts } =
    useSupplierProducts(supplierId);
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();

  const [groupBy, setGroupBy] = useState("None");
  const [orderBy, setOrderBy] = useState("Default");

  const handleSaveEdit = (id: number, data: updateProductT) => {
    updateProduct({ id: String(id), params: data });
  };

  const sortedProducts = supplierProducts
    ? [...supplierProducts.data].sort((a, b) => {
        if (orderBy === "Price Asc") return a.price - b.price;
        if (orderBy === "Price Desc") return b.price - a.price;
        if (orderBy === "Name") return a.name.localeCompare(b.name);
        return 0;
      })
    : [];

  return (
    <div className="min-h-screen animate-[fadeInUp_0.4s_ease_both] bg-page-green p-4 lg:p-8">
      <SEO title="Manage My Products" />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Header & Toolbar */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-deep-green">My Products</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            btnLabel=""
            variant="filled"
            color="primary"
            onClick={() => navigate("/supplier-dashboard/my-products/add")}
            className="flex items-center justify-center gap-1"
          >
            <FiPlus size={16} className="mr-2" />
            <p>Add Product</p>
          </Button>
        </div>
      </div>

      {/* Products Table/List */}
      <div className="overflow-hidden rounded-3xl border border-border-green bg-white shadow-sm">
        {/* Table Header / Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-green bg-panel-green px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-pale-green">
              <FiPackage size={20} />
            </div>
            <div>
              <span className="text-sm font-bold text-deep-green">
                Inventory
              </span>
              {supplierProducts && (
                <p className="text-[11px] font-medium text-light-green">
                  {supplierProducts.length} Total Items
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Group Filter */}
            <div className="relative">
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="hover:border-primary/30 cursor-pointer appearance-none rounded-xl border border-border-green bg-white py-2 pr-9 pl-4 text-xs font-semibold text-muted-green transition-all outline-none hover:bg-panel-green"
              >
                <option value="None">Group By: None</option>
                <option value="Category">Category</option>
                <option value="Stock">Stock Status</option>
              </select>
              <FiChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-green"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="hover:border-primary/30 cursor-pointer appearance-none rounded-xl border border-border-green bg-white py-2 pr-9 pl-4 text-xs font-semibold text-muted-green transition-all outline-none hover:bg-panel-green"
              >
                <option value="Default">Order By: Default</option>
                <option value="Price Asc">Price: Low to High</option>
                <option value="Price Desc">Price: High to Low</option>
                <option value="Name">Name: A–Z</option>
              </select>
              <FiChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-green"
              />
            </div>
          </div>
        </div>

        {/* Product List Content */}
        <div className="divide-y divide-soft-green bg-card-green p-2 lg:p-4">
          {isFetchingProducts ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="space-y-3">
              {sortedProducts?.map((product, index) => (
                <ProductRow
                  key={product.productId}
                  product={product}
                  index={index}
                  isDeleting={isDeleting}
                  isUpdating={isUpdating}
                  onDelete={(id) => deleteProduct(id)}
                  onSave={handleSaveEdit}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-soft-green text-light-green">
                <HiOutlineViewGridAdd size={40} className="opacity-40" />
              </div>
              <h3 className="text-lg font-bold text-deep-green">
                No Products Found
              </h3>
              <p className="mt-2 max-w-xs text-sm text-light-green">
                You haven't added any products to your inventory yet.
              </p>
              <Button
                btnLabel=""
                variant="filled"
                color="primary"
                className="mt-6 flex items-center justify-center gap-1"
                onClick={() => navigate("/supplier-dashboard/my-products/add")}
              >
                <FiPlus size={16} className="mr-2" />
                <p>Add Your First Product</p>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierProducts;
