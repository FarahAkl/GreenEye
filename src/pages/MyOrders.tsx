import { useState } from "react";
import useGetUserOrders from "../features/orders/hooks/useGetUserOrders";
import useCancelOrder from "../features/orders/hooks/useCancelOrder";
import useRefundOrder from "../features/orders/hooks/useRefundOrder";
import type { orderT } from "../schemas/ordersSchema";
import OrderCard from "../features/orders/ui/OrderCard";
import SEO from "../ui/SEO";

const SkeletonCard = () => {
  return (
    <div className="border-border-green from-soft-green-2 via-border-green to-soft-green-2 h-48 animate-[shimmer_1.3s_infinite] overflow-hidden rounded-2xl border bg-linear-to-r bg-size-[200%_100%]" />
  );
};

const MyOrders = () => {
  const [tab, setTab] = useState<"ongoing" | "history">("ongoing");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [refundingId, setRefundingId] = useState<string | null>(null);

  const { orders, isFetchingOrders, isError } = useGetUserOrders();
  const { cancelOrder, isCancelling } = useCancelOrder();
  const { refundOrder, isRefunding } = useRefundOrder();

  const handleCancel = (id: string) => {
    setCancellingId(id);
    cancelOrder(id, { onSettled: () => setCancellingId(null) });
  };

  const handleRefund = (id: string) => {
    setRefundingId(id);
    refundOrder(id, { onSettled: () => setRefundingId(null) });
  };

  const allOrders: orderT[] = Array.isArray(orders?.data)
    ? orders.data
    : Array.isArray(orders)
      ? orders
      : [];

  const ongoingOrders = allOrders.filter(
    (o) =>
      o.status !== "Delivered" &&
      o.status !== "Cancelled" &&
      o.status !== "Refunded",
  );
  const historyOrders = allOrders.filter(
    (o) =>
      o.status === "Delivered" ||
      o.status === "Cancelled" ||
      o.status === "Refunded",
  );

  const displayed = tab === "ongoing" ? ongoingOrders : historyOrders;

  return (
    <>
      <SEO
        title="My Orders"
        description="View and manage your purchase history and ongoing orders."
      />
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="bg-primary/10 relative px-4 py-20 sm:px-8 md:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1000 bg-[url('/images/productsBg.webp')] bg-repeat opacity-7"
        />

        <h1 className="text-dark mb-7 text-center text-5xl font-bold tracking-tight">
          My Orders
        </h1>

        {/* Tab bar */}
        <div
          role="tablist"
          className="mx-auto mb-8 flex max-w-lg rounded-xl bg-white p-1 shadow-sm"
        >
          {(["ongoing", "history"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-[15px] font-semibold capitalize transition-all duration-200 ${
                tab === t
                  ? "bg-primary text-white shadow"
                  : "text-muted-green-2 bg-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Order list */}
        <div className="mx-auto flex max-w-xl flex-col gap-5">
          {/* Loading skeletons */}
          {isFetchingOrders && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {/* Error */}
          {isError && (
            <div className="text-light-green mt-16 text-center">
              <p className="mb-3 text-4xl">⚠️</p>
              <p className="text-base">
                Something went wrong loading your orders.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isFetchingOrders && !isError && displayed.length === 0 && (
            <div className="text-light-green mt-16 text-center">
              <p className="mb-3 text-4xl">🌱</p>
              <p className="text-base">
                No {tab === "ongoing" ? "ongoing" : "past"} orders yet.
              </p>
            </div>
          )}

          {/* Cards */}
          {!isFetchingOrders &&
            displayed.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onCancel={handleCancel}
                isCancelling={isCancelling && cancellingId === String(order.id)}
                onRefund={handleRefund}
                isRefunding={isRefunding && refundingId === String(order.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
