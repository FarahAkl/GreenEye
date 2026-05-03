import { useState } from "react";
import {
  HiOutlineCube,
  HiOutlineWallet,
  HiOutlineClipboardDocumentList,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import SEO from "../../../ui/SEO";
import { useAuth } from "../../auth/hooks/useAuth";
import { useGetSupplierProfits } from "../hooks/useGetSupplierProfits";
import Spinner from "../../../ui/Spinner";
import CustomSelect from "../../../ui/CustomSelect";

const cards = [
  {
    title: "My Products",
    description: "View and manage your listed products and inventory.",
    icon: HiOutlineCube,
    color: "#2d9e7a",
    bg: "#e8f7f1",
    to: "/supplier-dashboard/my-products",
  },
  {
    title: "Wallet",
    description: "Check your balance, transactions, and request withdrawals.",
    icon: HiOutlineWallet,
    color: "#d97706",
    bg: "#fef3c7",
    to: "/supplier-dashboard/wallet",
  },
  {
    title: "Orders",
    description: "Track incoming orders and manage fulfillment.",
    icon: HiOutlineClipboardDocumentList,
    color: "#6366f1",
    bg: "#e0e7ff",
    to: "/supplier-dashboard/orders",
  },
];

const SupplierDashboard = () => {
  const { userId } = useAuth();
  const supplierId = userId || "";

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
    value: month.toString(),
    label: new Date(0, month - 1).toLocaleString("default", { month: "long" }),
  }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const { profits, isFetchingProfits } = useGetSupplierProfits(supplierId, {
    year: selectedYear,
    month: selectedMonth,
  });

  const yearlyProfits = profits?.data?.yearlyProfits ?? 0;
  const monthlyProfits = profits?.data?.monthlyProfits ?? 0;

  return (
    <div className="animate-[fadeInUp_0.4s_ease_both]">
      <SEO title="Supplier Dashboard" description="Manage your products, orders, and wallet from your supplier dashboard." />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header & Filters */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-deep-green">Supplier Overview</h1>
          <p className="text-light-green">
            Welcome back! Manage your business activities here.
          </p>
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1.5 w-36">
            <label className="text-xs font-semibold text-light-green ml-1">Month</label>
            <CustomSelect
              options={monthOptions}
              value={selectedMonth.toString()}
              onChange={(val) => setSelectedMonth(Number(val))}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-32">
            <label className="text-xs font-semibold text-light-green ml-1">Year</label>
            <CustomSelect
              options={yearOptions}
              value={selectedYear.toString()}
              onChange={(val) => setSelectedYear(Number(val))}
            />
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
            <HiOutlineBanknotes size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Profits</p>
            <div className="text-2xl font-bold text-gray-900">
              {isFetchingProfits ? <Spinner size="sm" /> : `${monthlyProfits.toLocaleString()} EGP`}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
            <HiOutlineBanknotes size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Yearly Profits</p>
            <div className="text-2xl font-bold text-gray-900">
              {isFetchingProfits ? <Spinner size="sm" /> : `${yearlyProfits.toLocaleString()} EGP`}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="group overflow-hidden rounded-2xl border border-[#e0f0e9] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
            <Link to={card.to} className="mt-4 text-xs font-semibold text-primary hover:underline">
              Go to {card.title} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDashboard;
