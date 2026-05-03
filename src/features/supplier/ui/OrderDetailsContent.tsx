import type { orderT } from "../../../schemas/ordersSchema";
import { formatDate } from "../../../utils/date";

const statusTone: Record<orderT["status"], string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-sky-100 text-sky-700",
  Processing: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Refunded: "bg-gray-200 text-gray-700",
};

const OrderDetailsContent = ({
  order,
}: {
  order: orderT;
  onCloseModal?: () => void;
}) => {
  return (
    <div className="mt-6 flex w-full max-w-2xl min-w-[320px] flex-col gap-6 md:min-w-170">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e0f0e9] bg-[#fafcfb] p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Order ID
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">#{order.id}</p>
        </div>
        <div className="rounded-2xl border border-[#e0f0e9] bg-[#fafcfb] p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Status
          </p>
          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusTone[order.status]}`}
          >
            {order.status}
          </span>
        </div>
        <div className="rounded-2xl border border-[#e0f0e9] bg-[#fafcfb] p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Delivery
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">
            {order.deliveryStatus}
          </p>
        </div>
        <div className="rounded-2xl border border-[#e0f0e9] bg-[#fafcfb] p-4">
          <p className="text-xs font-medium tracking-wide text-light-green uppercase">
            Total
          </p>
          <p className="mt-2 text-base font-bold text-deep-green">
            {order.totalPrice.toLocaleString()} EGP
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e0f0e9] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-light-green uppercase">
            Timeline
          </p>
          <div className="mt-3 space-y-3 text-sm text-deep-green">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-[#5d8a7d]">Created At</span>
              <span>{formatDate(order.createdAt, "en-GB")}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-[#5d8a7d]">
                Tracking Number
              </span>
              <span>{order.trackingNumber || "Not assigned"}</span>
            </div>
            
          </div>
        </div>

        <div className="rounded-2xl border border-[#e0f0e9] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-light-green uppercase">
            Totals
          </p>
          <div className="mt-3 space-y-3 text-sm text-deep-green">
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-[#5d8a7d]">Subtotal</span>
              <span>{order.subTotal.toLocaleString()} EGP</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-[#5d8a7d]">Delivery Fee</span>
              <span>{order.deliveryFee.toLocaleString()} EGP</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-[#5d8a7d]">Items Count</span>
              <span>{order.items?.length ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e0f0e9] bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-light-green uppercase">
          Ordered Products
        </p>

        {order.items && order.items.length > 0 ? (
          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-2xl border border-[#eef6f2] bg-[#fafcfb] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-deep-green">
                    {item.productName || "Unnamed product"}
                  </p>
                  <p className="text-sm text-light-green">
                    Qty: {item.quantity}
                    {item.userName ? ` . Customer: ${item.userName}` : ""}
                  </p>
                </div>
                <p className="text-sm font-bold text-deep-green">
                  {item.totalPrice.toLocaleString()} EGP
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-[#d4e8de] bg-[#fcfdfc] px-6 py-8 text-center text-sm text-light-green">
            No order items were returned for this order.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsContent;