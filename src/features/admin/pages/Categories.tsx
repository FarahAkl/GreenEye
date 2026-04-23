import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiGrid, FiChevronDown } from "react-icons/fi";
import { HiOutlineViewGridAdd } from "react-icons/hi";

import { useCategory } from "../../../hooks/useCategory";
import Button from "../../../ui/Button";
import CategoryRow from "../ui/CategoryRow";
import SkeletonRow from "../../suppplier/ui/SkeletonRow";
import SEO from "../../../ui/SEO";

const Categories = () => {
  const navigate = useNavigate();
  const { 
    categories, 
    isFetchingCategories, 
    deleteCategory, 
    isDeleting, 
    updateCategory, 
    isUpdating 
  } = useCategory();

  const [orderBy, setOrderBy] = useState("Default");

  const sortedCategories = categories?.data
    ? [...categories.data].sort((a, b) => {
        if (orderBy === "Name") return a.name.localeCompare(b.name);
        if (orderBy === "Products Count") return b.productCount - a.productCount;
        return 0;
      })
    : [];

  return (
    <div className="min-h-screen animate-[fadeInUp_0.4s_ease_both] bg-[#f4f9f6] p-4 lg:p-8">
      <SEO title="Categories" description="Manage and organize agricultural product categories." />
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
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Categories</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            btnLabel=""
            variant="filled"
            color="primary"
            onClick={() => navigate("/admin-dashboard/categories/add")}
            className="flex items-center justify-center gap-1"
          >
            <FiPlus size={16} className="mr-2" />
            <p>Add Category</p>
          </Button>
        </div>
      </div>

      {/* Categories Table/List */}
      <div className="overflow-hidden rounded-3xl border border-[#e0f0e9] bg-white shadow-sm">
        {/* Table Header / Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e0f0e9] bg-[#fcfdfc] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebf5f0]">
              <FiGrid size={20} />
            </div>
            <div>
              <span className="text-sm font-bold text-[#1a3a2e]">
                All Categories
              </span>
              {categories && (
                <p className="text-[11px] font-medium text-[#7a9e8e]">
                  {categories.data.length} Total Categories
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="hover:border-primary/30 cursor-pointer appearance-none rounded-xl border border-[#e0f0e9] bg-white py-2 pr-9 pl-4 text-xs font-semibold text-[#5d8a7d] transition-all outline-none hover:bg-[#fcfdfc]"
              >
                <option value="Default">Order By: Default</option>
                <option value="Name">Name: A–Z</option>
                <option value="Products Count">Most Products</option>
              </select>
              <FiChevronDown
                size={12}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#7a9e8e]"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="divide-y divide-[#f0f7f3] bg-[#fafcfb] p-2 lg:p-4">
          {isFetchingCategories ? (
            <div className="space-y-3">
               {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : sortedCategories.length > 0 ? (
            <div className="space-y-3">
              {sortedCategories.map((category, index) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  index={index}
                  isDeleting={isDeleting}
                  isUpdating={isUpdating}
                  onDelete={(id) => deleteCategory(id)}
                  onSave={(id, data) => updateCategory({ id, data })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#f0f7f3] text-[#7a9e8e]">
                <HiOutlineViewGridAdd size={40} className="opacity-40" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3a2e]">
                No Categories Found
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[#7a9e8e]">
                No categories have been created yet.
              </p>
              <Button
                btnLabel=""
                variant="filled"
                color="primary"
                className="mt-6 flex items-center justify-center gap-1"
                onClick={() => navigate("/admin-dashboard/categories/add")}
              >
                <FiPlus size={16} className="mr-2" />
                <p>Add Your First Category</p>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
