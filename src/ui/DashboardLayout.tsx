import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { logout } from "../features/auth/services/apiAuth";
import {
  LuLogOut,
  LuLayoutDashboard,
  LuUsers,
  LuPackage,
  LuWallet,
  LuClipboardList,
} from "react-icons/lu";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useScrollToTop } from "../hooks/useScrollToTop";

const DashboardLayout = () => {
  const { roles } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useScrollToTop();

  const lowerRoles = roles.map((r) => r.toLowerCase());
  const isAdmin = lowerRoles.includes("admin");
  const isSupplier = lowerRoles.includes("supplier");

  const adminLinks = [
    { to: "/admin-dashboard", label: "Overview", icon: LuLayoutDashboard },
    { to: "/admin-dashboard/users", label: "Pending Users", icon: LuUsers },
    {
      to: "/admin-dashboard/products",
      label: "Pending Products",
      icon: LuPackage,
    },
    {
      to: "/admin-dashboard/withdrawals",
      label: "Withdrawals",
      icon: LuWallet,
    },
  ];

  const supplierLinks = [
    { to: "/supplier-dashboard", label: "Overview", icon: LuLayoutDashboard },
    {
      to: "/supplier-dashboard/my-products",
      label: "My Products",
      icon: LuPackage,
    },
    {
      to: "/supplier-dashboard/orders",
      label: "Orders",
      icon: LuClipboardList,
    },
    { to: "/supplier-dashboard/wallet", label: "Wallet", icon: LuWallet },
  ];

  const links = isAdmin ? adminLinks : isSupplier ? supplierLinks : [];
  const dashboardLabel = isAdmin ? "Admin Panel" : "Supplier Panel";

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-[#f4f9f6]">
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#e0f0e9] bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center border-b border-[#e0f0e9] px-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="h-8 shrink-0" />
            <div className="flex flex-col">
              <span className="text-lg leading-none font-bold text-[#04591B]">
                GreenEye
              </span>
              <span className="text-[10px] font-medium tracking-wider text-[#7a9e8e] uppercase">
                {dashboardLabel}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-[#5d8a7d] hover:bg-[#ebf5f0] hover:text-[#1d4638]"
                }`
              }
            >
              <link.icon size={20} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#e0f0e9] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#7a9e8e] transition-all duration-200 hover:bg-red-50 hover:text-red-500"
          >
            <LuLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-[#e0f0e9] bg-white px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="h-8 shrink-0" />
            <span className="font-bold text-[#04591B]">GreenEye</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-[#5d8a7d] hover:bg-[#ebf5f0]"
          >
            {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </header>

        {/* Top bar - Desktop (optional, for notifications/profile etc) */}
        <header className="hidden h-16 items-center justify-between border-b border-[#e0f0e9] bg-white px-8 lg:flex">
          <h2 className="text-lg font-semibold text-[#1a3a2e]">Dashboard</h2>
          {/* Add profile info here if needed */}
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
