import { useCart } from "../features/cart/hooks/useCart";
import CartItem from "../features/cart/ui/CartItem";
import type { itemT } from "../schemas/cartSchema";
import Spinner from "../ui/Spinner";

const Cart = () => {
  const { cart, isFetchingCart, isError } = useCart();

  const { items, totalPrice, totalItems } = cart?.data || {};

  if (isFetchingCart)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-10 px-8 py-20 md:px-12 lg:px-24">
      <img
        src="/images/productsBg.png"
        alt=""
        className="absolute inset-0 -z-1000 h-full w-full object-cover opacity-6"
      />
      <div className="flex items-end justify-center gap-3">
        <p className="text-dark text-5xl font-bold">Cart</p>
        <p className="text-2xl text-gray-600">({totalItems} items)</p>
      </div>

      {items.length > 0 && (
        <div className="flex flex-col gap-4">
          {items.map((item:itemT) => (
            <CartItem item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
