import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useGetOrderById from "../features/orders/hooks/useGetOrderById";
import useShippingInfo from "../features/orders/hooks/useShippingInfo";
import OrderSummary from "../features/orders/ui/OrderSummary";
import DeliveryTracker from "../features/orders/ui/DeliveryTracker";
import { useAuth } from "../features/auth/hooks/useAuth";
import type { itemT } from "../schemas/cartSchema";
import { formatDate } from "../utils/date";
import SEO from "../ui/SEO";

const InfoField = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: string | null;
  className?: string;
}) => (
  <div className={className}>
    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
      {label}
    </p>
    <div className="text-dark border-primary min-h-13 rounded-2xl border-2 px-4 py-3 text-sm shadow-sm">
      {value?.trim() ? value : "Not available"}
    </div>
  </div>
);

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const { order, isFetchingOrder, isError } = useGetOrderById({
    orderId: orderId ?? "",
  });
  const { shippingInfo, isFetchShippingInfo } = useShippingInfo(orderId ?? "");
  const { user } = useAuth();

  if (isFetchingOrder || isFetchShippingInfo) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const orderData = order?.data;

  if (isError || !orderData) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-dark text-xl font-semibold">Order not found</p>
        <p className="max-w-md text-sm text-muted-green-2">
          We could not load the order details right now. Please try again from
          your orders page.
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="bg-primary cursor-pointer rounded-2xl px-6 py-3 font-semibold text-white"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  const customerName = user?.userName;
  const customerEmail = user?.email;
  const shippingAddress = [
    shippingInfo?.street,
    shippingInfo?.city,
    shippingInfo?.zipCode,
    shippingInfo?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentMethod =
    orderData.paymentIntentId || orderData.clientSecret ? "Card" : "Pending";
  const orderItems =
    orderData.items?.map((item: itemT) => ({
      id: item.id,
      productName: item.productName || "Unknown product",
      productImage: item.productImage || "",
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    })) ?? [];

  return (
    <section className="bg-primary/10 relative overflow-hidden px-4 py-12 sm:px-8 md:px-12 lg:px-16">
      <SEO
        title={`Order #${orderId}`}
        description="Track and view details for your eco-friendly product order."
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url('/images/productsBg.png')] bg-repeat opacity-6"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mb-4 flex cursor-pointer items-center gap-2 font-semibold text-muted-green transition-colors hover:text-hover-green"
          >
            <FiArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-dark mb-10 text-center text-5xl font-bold">
            Order Details
          </h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-gray-300 p-6 shadow-order-panel backdrop-blur-lg">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="mb-2 text-3xl font-semibold text-heading-green">
                  Order Information
                </p>
                <div className="space-y-1 text-sm text-muted-green">
                  <p>
                    <span className="font-semibold text-hover-green">
                      OrderID:
                    </span>{" "}
                    #{orderData.id}
                  </p>
                  <p>
                    <span className="font-semibold text-hover-green">
                      Initiated:
                    </span>{" "}
                    {formatDate(orderData.createdAt, "en-GB")}
                  </p>
                  <p>
                    <span className="font-semibold text-hover-green">
                      Status:
                    </span>{" "}
                    <span className="text-primary">{orderData.status}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-hover-green">
                      Delivery Status:
                    </span>{" "}
                    <span className="text-primary">
                      {orderData.deliveryStatus}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full max-w-3xl rounded-3xl px-4 py-5">
                <DeliveryTracker
                  deliveryStatus={
                    orderData.deliveryStatus 
                  }
                  createdAt={shippingInfo?.deliveredAt || orderData.createdAt}
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
              <div className="rounded-[28px] p-5">
                <p className="mb-5 text-3xl font-semibold text-heading-green">
                  Shipping & Payment Details
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoField label="Full Name" value={customerName} />
                  <InfoField
                    label="Country or Region"
                    value={shippingInfo?.country}
                  />
                  <InfoField label="Email" value={customerEmail} />
                  <InfoField label="City" value={shippingInfo?.city} />
                  <InfoField
                    label="Phone Number"
                    value={shippingInfo?.phoneNumber}
                  />
                  <InfoField label="Zip Code" value={shippingInfo?.zipCode} />
                  <InfoField
                    label="Payment Method"
                    value={paymentMethod}
                    className="md:col-span-2"
                  />
                  <InfoField
                    label="Street"
                    value={shippingAddress}
                    className="md:col-span-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[28px] p-5 shadow-sm">
                  <p className="mb-3 font-semibold text-hover-green">
                    Tracking Number
                  </p>
                  <p className="text-sm text-muted-green-2">
                    {shippingInfo?.trackingNumber ||
                      orderData.trackingNumber ||
                      "Tracking number will appear once the shipment is generated."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-300 p-6 shadow-order-panel backdrop-blur-lg">
            <OrderSummary
              items={orderItems}
              subtotal={orderData.subTotal}
              shipping={shippingInfo?.shippingCost ?? orderData.deliveryFee}
              total={orderData.totalPrice}
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
