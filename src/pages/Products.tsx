import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductsByCategory } from "../features/products/hooks/useProductsByCategory";
import { useProductsBySearch } from "../features/products/hooks/useProductsBySearch";
import { useOrderByPrice } from "../features/products/hooks/useOrderByPrice";
import { useCategory } from "../hooks/useCategory";
import ProductCard from "../features/products/ui/ProductCard";
import CustomSelect from "../ui/CustomSelect";
import type { productsT } from "../schemas/productsSchema";
import type { categoryT } from "../schemas/categorySchema";
import { useForm, useWatch } from "react-hook-form";
import Spinner from "../ui/Spinner";
import { IoSearch } from "react-icons/io5";
import { MdSort } from "react-icons/md";

type SortOrder = "ASC" | "DESC" | "";

const SORT_OPTIONS = [
  { value: "" as SortOrder, label: "Sort by price" },
  { value: "ASC" as SortOrder, label: "Low to High" },
  { value: "DESC" as SortOrder, label: "High to Low" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const sortOrder = (searchParams.get("sort") || "") as SortOrder;
  const pageNumber = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 10;

  const { products, isFetchingProducts } = useProducts({
    pageNumber,
    pageSize,
  });
  const { categoryProducts, isFetchingCategoryProducts } =
    useProductsByCategory(categoryId, { pageNumber, pageSize });
  const { searchProducts, isFetchingSearchProducts } = useProductsBySearch({
    query: searchQuery,
    categoryId: categoryId,
    pageNumber,
    pageSize,
  });
  const { orderedProducts, isOrderingProducts } = useOrderByPrice(
    sortOrder
      ? { pageNumber, pageSize, orderByDirection: sortOrder }
      : undefined,
  );
  const { categories } = useCategory();

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: { search: searchQuery },
  });

  const searchValue = useWatch({ control, name: "search" });

  useEffect(() => {
    setValue("search", searchQuery);
  }, [searchQuery, setValue]);

  const updateParams = (params: {
    search?: string;
    categoryId?: string;
    sort?: string;
    page?: number;
  }) => {
    const next = new URLSearchParams();
    if (params.search) next.set("search", params.search);
    if (params.categoryId) next.set("categoryId", params.categoryId);
    if (params.sort) next.set("sort", params.sort);
    next.set("page", String(params.page ?? 1));
    setSearchParams(next);
  };

  const onSearchSubmit = ({ search }: { search: string }) => {
    const normalizedSearch = search.trim();
    updateParams({
      search: normalizedSearch || undefined,
      categoryId: categoryId || undefined,
      sort: sortOrder || undefined,
      page: 1,
    });
  };

  const handleClearSearch = () => {
    setValue("search", "");
    updateParams({
      search: undefined,
      categoryId: categoryId || undefined,
      sort: sortOrder || undefined,
      page: 1,
    });
  };

  const handleCategoryClick = (id: number) => {
    updateParams({
      search: searchQuery || undefined,
      categoryId: String(id),
      sort: sortOrder || undefined,
      page: 1,
    });
  };

  const handleSortSelect = (value: SortOrder) => {
    updateParams({
      search: searchQuery || undefined,
      categoryId: categoryId || undefined,
      sort: value || undefined,
      page: 1,
    });
  };

  const isLoading =
    (!!sortOrder && isOrderingProducts) ||
    (!sortOrder && !searchQuery && !categoryId && isFetchingProducts) ||
    (!sortOrder && !!categoryId && isFetchingCategoryProducts) ||
    (!sortOrder && !!searchQuery && isFetchingSearchProducts);

  const displayedProducts: productsT[] = sortOrder
    ? (orderedProducts?.data?.data ?? [])
    : searchQuery
      ? (searchProducts?.data?.data ?? [])
      : categoryId
        ? (categoryProducts?.data?.data ?? [])
        : (products?.data?.data ?? []);

  const activeCategory = categories?.data?.find(
    (c: categoryT) => String(c.id) === categoryId,
  );

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="relative flex flex-col gap-8 px-4 py-20 sm:px-8 md:px-16">
      {/* Background */}
      <img
        src="/images/productsBg.png"
        alt=""
        className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-6"
      />

      {/* Search bar */}
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="mx-auto w-full max-w-xl rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200"
      >
        <div className="flex items-center gap-3 text-gray-400">
          <input
            type="text"
            {...register("search")}
            placeholder="Search products..."
            className="min-w-0 flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="shrink-0 text-gray-400 transition hover:text-gray-700"
            >
              ✕
            </button>
          )}
          <button type="submit" className="shrink-0">
            <IoSearch size={18} />
          </button>
        </div>
      </form>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() =>
            updateParams({
              search: undefined,
              categoryId: undefined,
              sort: sortOrder || undefined,
              page: 1,
            })
          }
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
            !categoryId && !searchQuery
              ? "border-teal-700 bg-teal-700 text-white"
              : "border-gray-300 text-gray-600 hover:border-teal-700"
          }`}
        >
          All
        </button>
        {categories?.data?.map((category: categoryT) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              String(category.id) === categoryId
                ? "border-teal-700 bg-teal-700 text-white"
                : "border-gray-300 text-gray-600 hover:border-teal-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Heading + Sort dropdown */}
      <div className="flex items-center justify-between">
        <p className="text-dark text-xl font-semibold sm:text-2xl">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : activeCategory
              ? activeCategory.name
              : "All Products"}
        </p>

        <CustomSelect<SortOrder>
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={handleSortSelect}
          icon={<MdSort size={18} />}
          placeholder="Sort by price"
          className="w-52"
        />
      </div>

      {/* Grid or empty state */}
      {displayedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <IoSearch size={48} className="text-gray-300" />
          <p className="text-dark text-xl font-semibold">No products found</p>
          <p className="text-sm text-gray-400">
            Try a different search or category
          </p>
          <button
            onClick={() => {
              handleClearSearch();
              updateParams({
                search: undefined,
                categoryId: undefined,
                sort: undefined,
                page: 1,
              });
            }}
            className="text-primary mt-2 text-sm underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedProducts.map((product: productsT) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
