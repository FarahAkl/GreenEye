import { useCart } from "../features/cart/hooks/useCart";
import CartItem from "../features/cart/ui/CartItem";
import type { itemT } from "../schemas/cartSchema";
import Spinner from "../ui/Spinner";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const Cart = () => {
  const { cart, isFetchingCart, isError } = useCart();
  const navigate = useNavigate();

  const { items, totalPrice, totalItems } = cart?.data || {};

  if (isFetchingCart)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <TiShoppingCart size={64} className="text-gray-300" />
        <p className="text-dark text-2xl font-semibold">Something went wrong</p>
        <p className="text-sm text-gray-500">
          We couldn't load your cart. Please try again.
        </p>
        <Button
          btnLabel="Retry"
          variant="filled"
          color="primary"
          onClick={() => window.location.reload()}
        />
      </div>
    );

  if (!items || items.length === 0)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <TiShoppingCart size={64} className="text-gray-300" />
        <p className="text-dark text-2xl font-semibold">Your cart is empty</p>
        <p className="text-sm text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Button
          btnLabel="Browse Marketplace"
          variant="filled"
          color="primary"
          onClick={() => navigate("/marketplace")}
        />
      </div>
    );

  return (
    <div className="relative flex flex-col gap-10 px-8 py-20 md:px-12 lg:px-24">
      <img
        src="/images/productsBg.png"
        alt=""
        className="fixed inset-0 -z-10 h-full w-full object-cover opacity-10"
      />
      <div className="flex items-end justify-center gap-3">
        <p className="text-dark text-5xl font-bold">Cart</p>
        <p className="text-2xl text-gray-600">({totalItems} items)</p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item: itemT) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-gray-100">
          <p className="text-dark text-lg font-semibold">Total:</p>
          <p className="text-dark text-2xl font-bold">
            {totalPrice?.toFixed(2)} EGP
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
