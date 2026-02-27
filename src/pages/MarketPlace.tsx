import { useSearchParams } from "react-router-dom";
import { useProducts } from "../features/products/hooks/useProducts";
import ProductCard from "../features/products/ui/ProductCard";
import type { productsT } from "../schemas/productsSchema";
import Spinner from "../ui/Spinner";
import { useForm, useWatch } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { useCategory } from "../hooks/useCategory";
import type { categoryT } from "../schemas/categorySchema";
import Button from "../ui/Button";

const MarketPlace = () => {
  const { products, isFetchingProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategory();

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  const searchValue = useWatch({
    control,
    name: "search",
  });

  const handleClearSearch = () => {
    setValue("search", "");
    setSearchParams({});
  };

  const onSearchSubmit = ({ search }: { search: string }) => {
    setSearchParams({ search });
  };

  if (isFetchingProducts)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col">
      <section className="relative h-130 w-full overflow-hidden">
        <img
          src="/images/marketBg.webp"
          alt="Marketplace background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-white">
          {/* Title */}
          <p className="text-5xl font-bold text-[#004630]">
            Smart Shop ,Smart Harvest
          </p>

          <div className="w-full max-w-xl rounded-lg bg-white py-2.5">
            <form onSubmit={handleSubmit(onSearchSubmit)}>
              <div className="flex flex-wrap items-center gap-5 rounded-lg px-4 text-gray-400">
                <input
                  type="text"
                  {...register("search")}
                  placeholder={"What are you searching for?"}
                  className="flex-1 outline-none"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="hover:text-black-700 text-gray-400 transition"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
                <button>
                  <IoSearch size={18} />
                </button>
              </div>
            </form>
          </div>
          <div className="flex gap-3">
            {categories?.data?.map((category: categoryT) => (
              <Button
                className="h-fit rounded-full! border border-teal-700 px-5 py-2! font-semibold"
                key={category.id}
                btnLabel={category.name}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="mx-20 my-24 grid grid-cols-4 gap-5">
        {products.data.map((product: productsT) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;
