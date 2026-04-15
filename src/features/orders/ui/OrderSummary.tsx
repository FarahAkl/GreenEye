type SummaryItem = {
  id: number;
  productName: string;
  productImage?: string;
  quantity: number;
  totalPrice: number;
};

type OrderSummaryProps = {
  items: SummaryItem[];
  subtotal: number;
  shipping: number;
  total: number;
  isLoading?: boolean;
};

const BASE_URL = import.meta.env.VITE_API_URL;

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  total,
  isLoading,
}: OrderSummaryProps) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl font-semibold">Order Summary</p>

      {/* Items */}
      <div className="flex flex-col gap-5 py-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-5">
            <p className="text-dark">x{item.quantity}</p>

            <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
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

            <p className="flex-1 text-gray-600">{item.productName}</p>

            <p className="text-dark">{item.totalPrice} EGP</p>
          </div>
        ))}
      </div>

      {/* Prices */}
      <div className="space-y-2 border-t border-t-gray-300 pt-4">
        <div className="flex justify-between">
          <span className="text-dark">Subtotal</span>
          <span className="text-dark font-semibold">{subtotal} EGP</span>
        </div>

        <div className="flex justify-between pb-4">
          <span className="text-dark">Shipping</span>
          <span
            className={`${shipping ? "text-dark" : "font-bold text-yellow-500"}`}
          >
            {shipping ? `${shipping} EGP` : "Choose shipping first"}
          </span>
        </div>

        <div className="text-dark flex justify-between border-t border-t-gray-300 pt-4 font-bold">
          <span className="text-lg font-bold">Total</span>
          <span>{total} EGP</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
