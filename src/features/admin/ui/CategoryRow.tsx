import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { RiEditBoxLine } from "react-icons/ri";
import Modal from "../../../ui/Modal";
import EditCategoryForm from "./EditCategoryForm";
import type { categoryT, createCategoryRequestT } from "../../../schemas/categorySchema";

const BASE_URL = import.meta.env.VITE_API_URL;

interface CategoryRowProps {
  category: categoryT;
  index: number;
  isDeleting: boolean;
  isUpdating: boolean;
  onDelete: (id: string) => void;
  onSave: (id: string, data: createCategoryRequestT) => void;
}

const CategoryRow = ({
  category,
  index,
  isDeleting,
  isUpdating,
  onDelete,
  onSave,
}: CategoryRowProps) => {
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    category.imageUrl && !category.imageUrl.startsWith("http")
      ? `${BASE_URL}${category.imageUrl}`
      : category.imageUrl;

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{ animation: `fadeSlideIn 0.35s ease ${index * 60}ms both` }}
    >
      {/* Thumbnail */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50">
        {!imgError && imageSrc ? (
          <img
            src={imageSrc}
            alt={category.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <BiCategory className="text-2xl text-gray-300" />
          </div>
        )}
      </div>

      {/* Name & Description */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-gray-900">
          {category.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-gray-400">
          {category.description || "No description provided"}
        </p>
      </div>

      {/* Stats */}
      <div className="min-w-30">
        <p className="text-xs text-gray-500">
          Products: <span className="font-bold text-gray-800">{category.productCount}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="ml-2 flex shrink-0 items-center gap-2">
        <Modal>
          <Modal.Open opens={`edit-cat-${category.id}`}>
            <button
              className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all hover:scale-105 hover:text-white active:scale-95"
              title="Edit category"
            >
              <FiEdit2 size={13} />
            </button>
          </Modal.Open>
          <Modal.Window
            name={`edit-cat-${category.id}`}
            icon={<RiEditBoxLine size={22} className="text-primary" />}
            title="Edit Category"
            description="Update the category details below."
          >
            <EditCategoryForm
              category={category}
              onSave={onSave}
              isUpdating={isUpdating}
            />
          </Modal.Window>
        </Modal>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-all hover:scale-105 hover:bg-red-500 hover:text-white active:scale-95"
          title="Delete category"
          disabled={isDeleting}
          onClick={() => onDelete(category.id.toString())}
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;
