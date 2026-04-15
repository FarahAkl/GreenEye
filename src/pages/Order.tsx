import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../features/cart/hooks/useCart";
import Spinner from "../ui/Spinner";
import type { itemT } from "../schemas/cartSchema";

const BASE_URL = import.meta.env.VITE_API_URL;

const Order = () => {
  const navigate = useNavigate();
  const { cart, isFetchingCart } = useCart();
  const { items } = cart?.data || {};

  if (isFetchingCart)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div className="flex flex-col gap-2 px-14 py-12">
        <div
          className="flex cursor-pointer items-center justify-start gap-2 font-semibold text-gray-400"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <p>Back</p>
        </div>
        <p className="text-dark py-4 text-3xl">Order Summary</p>

        <div className="flex flex-col gap-2">
          {items.map((item: itemT) => (
            <div key={item.id} className="flex items-center gap-3">
              <p className="text-dark">x{item.quantity}</p>
              <div className="aspect-square w-14 shrink-0 overflow-hidden rounded-xl border border-gray-300 bg-gray-50 sm:w-16 md:w-24">
                <img
                  src={
                    item.productImage
                      ? `${BASE_URL}${item.productImage}`
                      : "/images/productDefault.jpg"
                  }
                  alt={item.productName}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="font-semibold text-gray-600">{item.productName}</p>

              <p className="text-dark">{item.totalPrice} EGP</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary/15 px-14 py-12"> steps</div>
    </div>
  );
};

export default Order;
