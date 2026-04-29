import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { orderT } from "../../../schemas/ordersSchema";
import Button from "../../../ui/Button";
import DeliveryTracker from "./DeliveryTracker";
import { formatDate } from "../../../utils/date";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import LazyImage from "../../../ui/LazyImage";

const OrderCard = ({
  order,
  onCancel,
  isCancelling,
  onRefund,
  isRefunding,
}: {
  order: orderT;
  onCancel: (id: string) => void;
  isCancelling: boolean;
  onRefund: (id: string) => void;
  isRefunding: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemCount = order.items?.length ?? 0;
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const isPaid = order.status === "Paid";
  const canResumePayment = order.status === "Pending" && !!order.id;
  const canCancel =
    !isPaid &&
    order.status !== "Cancelled" &&
    order.status !== "Delivered" &&
    order.status !== "Refunded";

  const isCancelledStatus = order.status === "Cancelled";
  const isTerminalNegative =
    order.status === "Cancelled" || order.status === "Refunded";

  return (
    <div className="animate-[slideUp_0.3s_ease_both] overflow-hidden rounded-2xl border border-[#e0f0e9] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] font-bold text-[#1a3a2e]">
            OrderID: #{order.id}
          </h3>
          <p className="text-[13px] text-[#7a9e8e]">
            Initiated:{" "}
            {formatDate(order.createdAt, "en-GB")}
          </p>
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#7a9e8e]">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isCancelledStatus ? "bg-red-400" : "bg-primary"
              }`}
            />
            {order.status}
          </p>
        </div>

        {!isTerminalNegative && (
          <Button
            btnLabel="Details"
            onClick={() => navigate(`/order/${order.id}`)}
            className="h-10! rounded-full! px-6!"
          />
        )}
      </div>

      {/* Products bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#e8f7f1] py-2 text-sm font-semibold text-[#2d9e7a] transition-colors hover:bg-[#d9f2e7]"
      >
        {itemCount} Product{itemCount !== 1 ? "s" : ""}
        {isExpanded ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
      </button>

      {/* Expanded Products List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[#e0f0e9]"
          >
            <div className="flex flex-col gap-3 px-5 py-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                    <LazyImage
                      src={
                        item.productImage
                          ? `${BASE_URL}${item.productImage}`
                          : null
                      }
                      alt={item.productName ?? "Product"}
                      className="h-full w-full object-contain"
                      iconSize={24}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-sm font-bold text-[#1a3a2e]">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-[#7a9e8e]">
                      Qty: {item.quantity} × {item.unitPrice.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#2d9e7a]">
                    {item.totalPrice.toLocaleString()} EGP
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price + Tracker */}
      <div className="px-5 pt-4 pb-3">
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-[13px] text-[#7a9e8e]">Total Price:</span>
          <span className="text-base font-bold text-[#1a3a2e]">
            {order.totalPrice.toLocaleString()} EGP
          </span>
        </div>

        {!isTerminalNegative && (
          <DeliveryTracker
            deliveryStatus={order.deliveryStatus}
            createdAt={order.createdAt}
          />
        )}
      </div>

      {/* Cancel / Refund action */}
      {(canResumePayment || canCancel || isPaid) && (
        <div className="flex flex-wrap justify-end gap-3 px-5 pt-1 pb-4">
          {canResumePayment && (
            <Button
              btnLabel="Pay Now"
              onClick={() => navigate(`/order?orderId=${order.id}`)}
              className="h-10! cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#034415]"
            />
          )}
          {isPaid ? (
            <Button
              btnLabel={isRefunding ? "Refunding…" : "Refund"}
              onClick={() => onRefund(String(order.id))}
              disabled={isRefunding}
              className="h-10! cursor-pointer rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-55"
            />
          ) : (
            <Button
              btnLabel={isCancelling ? "Cancelling…" : "Cancel"}
              onClick={() => onCancel(String(order.id))}
              disabled={isCancelling}
              className="h-10! cursor-pointer rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-55"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
