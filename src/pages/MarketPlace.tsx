import { useProducts } from "../features/products/hooks/useProducts";
import ProductCard from "../features/products/ui/ProductCard";
import type { productsT } from "../schemas/productsSchema";
import Spinner from "../ui/Spinner";

const MarketPlace = () => {
  const { products, isFetchingProducts } = useProducts();

  if (isFetchingProducts) return <Spinner />;
  return (
    <div className="flex flex-wrap gap-5">
      {products.data.map((product: productsT) => (
        <div key={product.id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default MarketPlace;
