import { useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuUser,
  LuCalendar,
  LuMail,
  LuPhone,
  LuPackage,
  LuShoppingCart,
} from "react-icons/lu";
import SEO from "../../../ui/SEO";
import { formatDate } from "../../../utils/date";
import Spinner from "../../../ui/Spinner";
import useUserOrders from "../../orders/hooks/useUserOrders";
import { useProfile } from "../../profile/hooks/useProfile";
import type { orderT } from "../../../schemas/ordersSchema";

const UserActivity = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { profileData, isFetchingProfile } = useProfile(userId);
  const user = profileData?.data;

  const { orders, isFetchingOrders } = useUserOrders(userId || "");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const isLoading = isFetchingProfile || isFetchingOrders;

  if (isLoading) {
    return (
      <div className="flex h-100 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <p className="text-gray-500">User not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary flex items-center gap-2 font-semibold hover:underline"
        >
          <LuArrowLeft size={18} /> Back
        </button>
      </div>
    );
  }

  const userOrders = orders?.data || [];

  return (
    <div className="flex flex-col gap-8 p-4">
      <SEO title={`${user.name}'s Activity`} />

      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="text-dark hover:text-primary flex items-center gap-2 font-semibold transition-colors"
      >
        <LuArrowLeft size={20} />
        Back to Users
      </button>
      <div className="bg-dark/90 rounded-2xl px-6 py-2">
        <h1 className="text-lg font-semibold text-white">User Activity</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Profile Section */}
        <div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-8">
              <div className="flex shrink-0 flex-col items-center">
                <div className="border-primary/10 mb-4 h-24 w-24 overflow-hidden rounded-full border-4 bg-gray-50">
                  {user.profileImage ? (
                    <img
                      src={`${BASE_URL}${user.profileImage}`}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <LuUser className="text-gray-300" size={40} />
                    </div>
                  )}
                </div>
                <h2 className="text-dark text-center text-xl font-bold">
                  {user.name}
                </h2>
              </div>

              <div className="grid w-full flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuMail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-dark font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuPhone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone Number</p>
                    <p className="text-dark font-medium">
                      {user.phoneNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                    <LuCalendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Join Date</p>
                    <p className="text-dark font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        {/* Orders Section */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-primary flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 shadow-inner">
                <LuShoppingCart size={22} />
              </div>
              <div>
                <h3 className="text-dark text-lg font-bold">
                  Purchase History
                </h3>
                <p className="text-sm text-[#7a9e8e]">
                  Recent orders placed by this user
                </p>
              </div>
            </div>
            <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold">
              {userOrders.length} Orders
            </div>
          </div>

          {userOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <LuPackage size={30} className="text-gray-300" />
              </div>
              <p className="max-w-xs text-gray-500">
                No orders found for this user.
              </p>
            </div>
          ) : (
            <div className="mt-5">
              {/* Mobile View: Cards */}
              <div className="space-y-4 lg:hidden">
                {userOrders.map((order: orderT) => (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-[#e0f0e9] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-[#1a3a2e]">
                          Order #{order.id}
                        </p>
                        <p className="text-xs text-[#7a9e8e]">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                          order.status === "Cancelled" ||
                          order.status === "Refunded"
                            ? "bg-red-50 text-red-600"
                            : "text-primary bg-teal-50"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          Amount
                        </span>
                        <span className="text-primary text-base font-black">
                          {order.totalPrice.toLocaleString()} EGP
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                          Delivery
                        </span>
                        <p className="text-xs font-bold text-[#1a3a2e]">
                          {order.deliveryStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-[#e0f0e9] lg:block">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#fafcfb] text-gray-600">
                    <tr className="border-b border-[#e0f0e9]">
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Order ID
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Date
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Status
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Delivery
                      </th>
                      <th className="px-6 py-4 font-bold text-[#1a3a2e]">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3f4f6]">
                    {userOrders.map((order: orderT) => (
                      <tr
                        key={order.id}
                        className="transition-colors hover:bg-[#fcfdfc]"
                      >
                        <td className="px-6 py-4 font-bold text-[#1a3a2e]">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 text-[#7a9e8e]">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                              order.status === "Delivered"
                                ? "text-primary bg-teal-50"
                                : order.status === "Cancelled" ||
                                    order.status === "Refunded"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-teal-50 text-teal-600"
                            }`}
                          >
                            <div
                              className={`h-1 w-1 rounded-full ${
                                order.status === "Cancelled" ||
                                order.status === "Refunded"
                                  ? "bg-red-600"
                                  : "bg-primary"
                              }`}
                            />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#1a3a2e]">
                            {order.deliveryStatus}
                          </span>
                        </td>
                        <td className="text-primary px-6 py-4">
                          {order.totalPrice.toLocaleString()} EGP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
