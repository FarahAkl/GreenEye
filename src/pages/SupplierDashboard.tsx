import {
  HiOutlineCube,
  HiOutlineWallet,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

const cards = [
  {
    title: "My Products",
    description: "View and manage your listed products and inventory.",
    icon: HiOutlineCube,
    color: "#2d9e7a",
    bg: "#e8f7f1",
  },
  {
    title: "Wallet",
    description: "Check your balance, transactions, and request withdrawals.",
    icon: HiOutlineWallet,
    color: "#d97706",
    bg: "#fef3c7",
  },
  {
    title: "Orders",
    description: "Track incoming orders and manage fulfillment.",
    icon: HiOutlineClipboardDocumentList,
    color: "#6366f1",
    bg: "#e0e7ff",
  },
];

const SupplierDashboard = () => {
  return (
    <div className="animate-[fadeInUp_0.4s_ease_both]">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-[#1a3a2e]">Supplier Overview</h1>
        <p className="text-[#7a9e8e]">
          Welcome back! Manage your business activities here.
        </p>
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
            <h2 className="mb-1 text-lg font-bold text-[#1a3a2e]">
              {card.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#7a9e8e]">
              {card.description}
            </p>
            <button className="mt-4 text-xs font-semibold text-primary hover:underline">
              Go to {card.title} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDashboard;
