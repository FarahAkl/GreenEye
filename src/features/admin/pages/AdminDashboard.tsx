import {
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineBanknotes,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SEO from "../../../ui/SEO";
import { useProductsCount } from "../hooks/useProductsCount";
import { useOrdersCount } from "../hooks/useOrdersCount";
import Spinner from "../../../ui/Spinner";

const cards = [
  {
    title: "All Users",
    description: "Review and approve new supplier and expert registrations.",
    icon: HiOutlineUsers,
    color: "var(--color-success-green)",
    bg: "var(--color-success-bg)",
    to: "/admin-dashboard/users/all",
  },
  {
    title: "All Products",
    description: "Approve or reject products submitted by suppliers.",
    icon: HiOutlineCube,
    color: "var(--color-warning)",
    bg: "var(--color-warning-bg)",
    to: "/admin-dashboard/products/all",
  },
  {
    title: "Pending Updates",
    description: "Review supplier requests to update existing product details.",
    icon: HiOutlineCube,
    color: "var(--color-teal)",
    bg: "var(--color-teal-bg)",
    to: "/admin-dashboard/products/updates",
  },
  {
    title: "Withdrawal Requests",
    description: "Manage pending supplier withdrawal requests.",
    icon: HiOutlineBanknotes,
    color: "var(--color-indigo)",
    bg: "var(--color-indigo-bg)",
    to: "/admin-dashboard/withdrawals/requests",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { productsCount, isFetchingProductsCount } = useProductsCount();
  const { ordersCount, isFetchingOrdersCount } = useOrdersCount();

  const pCount = productsCount?.data ?? productsCount ?? 0;
  const oCount = ordersCount?.data ?? ordersCount ?? 0;

  return (
    <div className="animate-[fadeInUp_0.4s_ease_both]">
      <SEO title="Admin Dashboard" />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-deep-green">
          Admin Overview
        </h1>
        <p className="text-light-green">
          Welcome back! Here's what needs your attention today.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <HiOutlineCube size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <div className="text-2xl font-bold text-gray-900">
              {isFetchingProductsCount ? <Spinner size="sm"/> : pCount}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
            <HiOutlineShoppingCart size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <div className="text-2xl font-bold text-gray-900">
              {isFetchingOrdersCount ? <Spinner size="sm" /> : oCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="group overflow-hidden rounded-2xl border border-border-green bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              animation: `fadeInUp 0.4s ease ${i * 0.1}s both`,
            }}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: card.bg }}
            >
              <card.icon size={24} style={{ color: card.color }} />
            </div>
            <h2 className="mb-1 text-lg font-bold text-deep-green">
              {card.title}
            </h2>
            <p className="text-sm leading-relaxed text-light-green">
              {card.description}
            </p>
            <button
              className="text-primary mt-4 text-xs font-semibold hover:underline"
              onClick={() => navigate(card.to)}
            >
              View details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
