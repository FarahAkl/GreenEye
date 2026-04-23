import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useGetOrderById from "../features/orders/hooks/useGetOrderById";
import useShippingInfo from "../features/orders/hooks/useShippingInfo";
import OrderSummary from "../features/orders/ui/OrderSummary";
import DeliveryTracker from "../features/orders/ui/DeliveryTracker";
import { useProfile } from "../features/profile/hooks/useProfile";
import type { itemT } from "../schemas/cartSchema";
import { formatDate } from "../utils/date";

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
  const { profileData } = useProfile();

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
        <p className="max-w-md text-sm text-[#6b8a7e]">
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

  const customerName = profileData?.data.name;
  const customerEmail = profileData?.data.email;
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
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[url('/images/productsBg.png')] bg-repeat opacity-6"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mb-4 flex cursor-pointer items-center gap-2 font-semibold text-[#5d8a7d] transition-colors hover:text-[#1d4638]"
          >
            <FiArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-dark mb-10 text-center text-5xl font-bold">
            Order Details
          </h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-gray-300 p-6 shadow-[0_20px_60px_rgba(0,47,32,0.1)] backdrop-blur-lg">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="mb-2 text-3xl font-semibold text-[#345e52]">
                  Order Information
                </p>
                <div className="space-y-1 text-sm text-[#5d8a7d]">
                  <p>
                    <span className="font-semibold text-[#1d4638]">
                      OrderID:
                    </span>{" "}
                    #{orderData.id}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1d4638]">
                      Initiated:
                    </span>{" "}
                    {formatDate(orderData.createdAt, "en-GB")}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1d4638]">
                      Status:
                    </span>{" "}
                    <span className="text-primary">{orderData.status}</span>
                  </p>
                </div>
              </div>

              <div className="w-full max-w-3xl rounded-3xl px-4 py-5">
                <DeliveryTracker
                  deliveryStatus={
                    shippingInfo?.status ?? orderData.deliveryStatus
                  }
                  createdAt={shippingInfo?.deliveredAt || orderData.createdAt}
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
              <div className="rounded-[28px] p-5">
                <p className="mb-5 text-3xl font-semibold text-[#345e52]">
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
                {/* <div className="rounded-[28px] p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-2xl p-3">
                      <FiTruck size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1d4638]">
                        Shipment Info
                      </p>
                      <p className="text-sm text-[#6b8a7e]">
                        Tracking and delivery details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-[#355a4d]">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary" />
                      <span>
                        {shippingAddress || "Shipping address not available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-primary" />
                      <span>
                        {shippingInfo?.phoneNumber ||
                          "Phone number not available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="text-primary" />
                      <span>{paymentMethod}</span>
                    </div>
                  </div>
                </div> */}

                <div className="rounded-[28px] p-5 shadow-sm">
                  <p className="mb-3 font-semibold text-[#1d4638]">
                    Tracking Number
                  </p>
                  <p className="text-sm text-[#6b8a7e]">
                    {shippingInfo?.trackingNumber ||
                      orderData.trackingNumber ||
                      "Tracking number will appear once the shipment is generated."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-300 p-6 shadow-[0_20px_60px_rgba(0,47,32,0.1)] backdrop-blur-lg">
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
