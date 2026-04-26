import { useMemo, useState } from "react";
import {
  LuCalendar,
  LuEye,
  LuPackage,
  LuShoppingCart,
  LuTruck,
} from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useSupplierOrders } from "../hooks/useSupplierOrders";
import type { orderT } from "../../../schemas/ordersSchema";
import SEO from "../../../ui/SEO";
import Modal from "../../../ui/Modal";
import Spinner from "../../../ui/Spinner";
import { formatDate } from "../../../utils/date";
import OrderDetailsContent from "../ui/OrderDetailsContent";

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

const tabs = [
  { id: "all", label: "ALL", status: undefined },
  { id: "pending", label: "Pending", status: "Pending" },
  { id: "processing", label: "Processing", status: "Processing" },
  { id: "delivered", label: "Delivered", status: "Delivered" },
  { id: "cancelled", label: "Cancelled", status: "Cancelled" },
] as const;

type SupplierOrdersTab = (typeof tabs)[number];

const SupplierOrders = () => {
  const { supplierOrders, isFetchingOrders, isError } = useSupplierOrders();
  const [activeTab, setActiveTab] = useState<SupplierOrdersTab>(tabs[0]);

  const orders = useMemo(() => {
    if (!supplierOrders?.data) return [];
    return Array.isArray(supplierOrders.data)
      ? supplierOrders.data
      : [supplierOrders.data];
  }, [supplierOrders]);

  const filteredOrders = useMemo(() => {
    if (!activeTab.status) return orders;
    return orders.filter((order: orderT) => order.status === activeTab.status);
  }, [activeTab.status, orders]);

  if (isFetchingOrders) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-2">
      <SEO
        title="Supplier Orders"
        description="Track and manage orders that include your products."
      />

      <div className="bg-dark/90 rounded-2xl px-6 py-3.5">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Orders
        </h1>
      </div>

      <div className="mt-2 flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-8 py-1.5 text-sm font-bold transition-all ${
              activeTab.id === tab.id
                ? "border-secondary text-dark border-2"
                : "border-primary/80 text-dark hover:border-primary border-2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <Modal>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="px-4 py-4 font-medium">Order</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Delivery</th>
                <th className="px-4 py-4 font-medium">Tracking Number</th>
                <th className="px-4 py-4 font-medium">Items</th>
                <th className="px-4 py-4 font-medium">Created At</th>
                <th className="px-4 py-4 font-medium">Total</th>
                <th className="px-4 py-4 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {isError ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[#6b7280]">
                    Something went wrong while loading your orders.
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[#6b7280]">
                    <div className="flex flex-col items-center gap-3">
                      <HiOutlineClipboardList
                        size={34}
                        className="text-[#9ca3af]"
                      />
                      <span>No orders found for this filter.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: orderT) => (
                  <tr
                    key={order.id}
                    className="hover:bg-primary/15 border-b border-[#f3f4f6] transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebf5f0]">
                          <LuShoppingCart size={18} />
                        </div>
                        <div>
                          <p className="text-dark font-bold">#{order.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusTone[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-medium">
                        <LuTruck size={16} className="text-gray-400" />
                        {order.deliveryStatus}
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {order.trackingNumber || "Not assigned"}
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {order.items?.length ?? 0}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-dark flex items-center gap-2 font-bold">
                        <LuCalendar size={16} className="text-gray-400" />
                        {formatDate(order.createdAt, "en-GB")}
                      </div>
                    </td>
                    <td className="text-dark px-4 py-4 font-bold">
                      {order.totalPrice.toLocaleString()} EGP
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <Modal.Open opens={`details-${order.id}`}>
                          <button
                            className="bg-primary hover:bg-secondary flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white transition-colors"
                            title="View order details"
                          >
                            <LuEye size={16} />
                            Details
                          </button>
                        </Modal.Open>

                        <Modal.Window
                          name={`details-${order.id}`}
                          icon={
                            <LuPackage size={24} className="text-primary" />
                          }
                          title={`Order #${order.id}`}
                          description="Review the full details for this supplier order."
                        >
                          <OrderDetailsContent order={order} />
                        </Modal.Window>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default SupplierOrders;
