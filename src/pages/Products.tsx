import { useSearchParams } from "react-router-dom";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategory } from "../hooks/useCategory";
import ProductCard from "../features/products/ui/ProductCard";
import type { productsT } from "../schemas/productsSchema";
import type { categoryT } from "../schemas/categorySchema";
import Spinner from "../ui/Spinner";
import { useForm, useWatch } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";

  const { products, isFetchingProducts } = useProducts();
  const { categories } = useCategory();

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: { search: searchQuery },
  });

  const searchValue = useWatch({ control, name: "search" });

  const onSearchSubmit = ({ search }: { search: string }) => {
    setSearchParams(search.trim() ? { search } : {});
  };

  const handleClearSearch = () => {
    setValue("search", "");
    setSearchParams({});
  };

  const handleCategoryClick = (id: number) => {
    setSearchParams({ categoryId: String(id) });
  };

  const displayedProducts: productsT[] = (products?.data ?? []).filter(
    (p: productsT) => {
      const matchesSearch = searchQuery
        ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory = categoryId
        ? String(p.categoryId) === categoryId
        : true;
      return matchesSearch && matchesCategory;
    },
  );

  const activeCategory = categories?.data?.find(
    (c: categoryT) => String(c.id) === categoryId,
  );

  if (isFetchingProducts)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 px-4 py-20 sm:px-8 md:px-16">
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
          onClick={() => setSearchParams({})}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
            !categoryId
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

      {/* Heading */}
      <div className="flex items-center justify-between">
        <p className="text-dark text-xl font-semibold sm:text-2xl">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : activeCategory
              ? activeCategory.name
              : "All Products"}
        </p>
        <p className="text-sm text-gray-400">
          {displayedProducts.length} products
        </p>
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
              setSearchParams({});
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
