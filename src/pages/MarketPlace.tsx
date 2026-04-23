import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategory } from "../hooks/useCategory";
import type { productsT } from "../schemas/productsSchema";
import type { categoryT } from "../schemas/categorySchema";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../features/products/ui/ProductCard";
import { IoSearch } from "react-icons/io5";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import SEO from "../ui/SEO";

const BASE_URL = import.meta.env.VITE_API_URL;

const MarketPlace = () => {
  const { products, isFetchingProducts } = useProducts({ pageSize: 8 });
  const { categories } = useCategory();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: { search: "" },
  });

  const onSearchSubmit = ({ search }: { search: string }) => {
    if (search.trim())
      navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/products?categoryId=${categoryId}`);
  };

  if (isFetchingProducts)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col">
      <SEO title="Marketplace" description="Browse and shop for high-quality, sustainable agricultural products." />
      {/* Hero / Search */}
      <section className="relative min-h-80 w-full overflow-hidden px-4 sm:h-110 sm:px-8 md:h-130 md:px-16">
        <img
          src="/images/marketBg.webp"
          alt="Marketplace background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-12 text-center text-white sm:py-0">
          <p className="text-dark text-2xl leading-tight font-bold sm:text-4xl md:text-5xl">
            Smart Shop, Smart Harvest
          </p>

          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            className="w-full max-w-xs rounded-lg bg-white px-4 py-2.5 sm:max-w-md md:max-w-xl"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <input
                type="text"
                {...register("search")}
                placeholder="What are you searching for?"
                className="min-w-0 flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button type="submit" className="shrink-0">
                <IoSearch size={18} />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 px-4">
            {categories?.data?.map((category: categoryT) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="border-primary h-fit rounded-full! border px-4 py-1.5! text-sm font-semibold"
                btnLabel={category.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="px-4 py-10 sm:px-8 md:px-16">
        <p className="text-dark mb-6 text-2xl">Search By Categories</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories?.data.map((category: categoryT) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-5 shadow-sm transition hover:shadow-md"
            >
              <div className="h-16 w-16 overflow-hidden sm:h-20 sm:w-20 md:h-24 md:w-24">
                <img
                  src={`${BASE_URL}${category.imageUrl}`}
                  alt={category.name}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-dark mt-3 px-2 text-center text-xs font-semibold sm:text-sm">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products preview */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-16">
        <p className="text-dark text-xl sm:text-2xl">Discover Products</p>
        <Link
          to={"/products"}
          className="text-primary flex items-center gap-0.5 text-sm sm:text-base"
        >
          <p>View All</p>
          <MdKeyboardArrowRight size={20} />
        </Link>
      </div>
      <div className="mx-4 my-10 grid grid-cols-1 gap-5 sm:mx-8 sm:grid-cols-2 md:mx-14 md:grid-cols-3 lg:grid-cols-4">
        {products?.data?.data.map((product: productsT) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;
