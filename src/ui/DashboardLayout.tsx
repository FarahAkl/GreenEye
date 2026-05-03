import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useProfile } from "../features/profile/hooks/useProfile";
import { logout } from "../features/auth/services/apiAuth";
import {
  LuLogOut,
  LuLayoutDashboard,
  LuPackage,
  LuWallet,
  LuClipboardList,
  // LuShoppingBag,
  LuLayoutGrid,
  LuChevronDown,
  LuChevronRight,
  LuUser,
  LuChartBar,
} from "react-icons/lu";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useScrollToTop } from "../hooks/useScrollToTop";
import type { IconType } from "react-icons";

const BASE_URL = import.meta.env.VITE_API_URL;

interface SubLink {
  to: string;
  label: string;
  badge?: number;
  badgeColor?: string;
}

interface SidebarItemType {
  to?: string;
  label: string;
  icon: IconType;
  subLinks?: SubLink[];
}

const SidebarItem = ({
  item,
  setIsSidebarOpen,
  pathname,
}: {
  item: SidebarItemType;
  setIsSidebarOpen: (open: boolean) => void;
  pathname: string;
}) => {
  const isSubActive = item.subLinks?.some(
    (sub: SubLink) => pathname === sub.to || pathname.startsWith(sub.to + "/"),
  );
  const [isUserToggled, setIsUserToggled] = useState(false);
  const isOpen = isUserToggled || isSubActive;

  if (!item.subLinks) {
    return item.to ? (
      <NavLink
        to={item.to}
        end={
          item.to === "/admin-dashboard" || item.to === "/supplier-dashboard"
        }
        onClick={() => setIsSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-xl px-2 py-3 text-[15px] font-semibold transition-all duration-200 ${
            isActive
              ? "bg-[#e9f2ee] text-[#3b8768]"
              : "text-[#6b7280] hover:bg-[#f0fdf4] hover:text-[#3b8768]"
          }`
        }
      >
        <span className="w-4"></span>
        <item.icon size={22} />
        <span className="flex-1">{item.label}</span>
      </NavLink>
    ) : null;
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsUserToggled(!isOpen)}
        className={`flex w-full items-center gap-2 rounded-xl px-2 py-3 text-[15px] font-semibold text-[#6b7280] transition-all duration-200 hover:bg-[#f0fdf4] hover:text-[#3b8768]`}
      >
        <span className="flex w-4 justify-center text-[#9ca3af]">
          {isOpen ? <LuChevronDown size={16} /> : <LuChevronRight size={16} />}
        </span>
        <item.icon size={22} />
        <span className="flex-1 text-left">{item.label}</span>
      </button>
      {isOpen && (
        <div className="space-y-1">
          {item.subLinks.map((subLink: SubLink) => (
            <NavLink
              key={subLink.to}
              to={subLink.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl py-2.5 pr-4 pl-13 text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#e9f2ee] text-[#3b8768]"
                    : "text-[#6b7280] hover:text-[#3b8768]"
                }`
              }
            >
              <span>- {subLink.label}</span>
              {subLink.badge && (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white ${subLink.badgeColor || "bg-[#de4436]"}`}
                >
                  {subLink.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardLayout = () => {
  const { roles, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { profileData } = useProfile(undefined, isAuthenticated);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  useScrollToTop();

  const lowerRoles = roles.map((r) => r.toLowerCase());
  const isAdmin = lowerRoles.includes("admin");
  const isSupplier = lowerRoles.includes("supplier");

  const adminLinks = [
    { to: "/admin-dashboard", label: "Overview & Analytics", icon: LuChartBar },
    {
      label: "User Management",
      icon: LuUser,
      subLinks: [
        { to: "/admin-dashboard/users/all", label: "All Users" },
        {
          to: "/admin-dashboard/users/pending",
          label: "Pending Users",
        },
      ],
    },
    {
      label: "Product Management",
      icon: LuPackage,
      subLinks: [
        { to: "/admin-dashboard/products/all", label: "All Products" },
        {
          to: "/admin-dashboard/products/pending",
          label: "Pending Products",
        },
        { to: "/admin-dashboard/products/updates", label: "Pending Updates" },
      ],
    },
    // { to: "/admin-dashboard/orders", label: "Orders", icon: LuShoppingBag },
    {
      label: "Wallets & Cash Flow",
      icon: LuWallet,
      subLinks: [
        {
          to: "/admin-dashboard/withdrawals/requests",
          label: "Withdrawal Requests",
        },
        {
          to: "/admin-dashboard/withdrawals/wallets",
          label: "Supplier Wallets",
        },
      ],
    },
    {
      to: "/admin-dashboard/categories",
      label: "Categories",
      icon: LuLayoutGrid,
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

  const userAvatar = profileData?.data?.profileImageUrl;

  return (
    <div className="flex h-screen bg-[#f4f9f6]">
      {/* Sidebar - Desktop */}
      <aside
        className={`no-scrollbar fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-scroll border-r border-[#e0f0e9] bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center border-b border-[#e0f0e9] px-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="h-8 shrink-0" />
            <div className="flex flex-col">
              <span className="text-lg leading-none font-bold text-[#04591B]">
                GreenEye
              </span>
              <span className="text-light-green text-[10px] font-medium tracking-wider uppercase">
                {dashboardLabel}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link, index) => (
            <SidebarItem
              key={index}
              item={link}
              setIsSidebarOpen={setIsSidebarOpen}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="border-t border-[#e0f0e9] p-4">
          <button
            onClick={handleLogout}
            className="text-light-green flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-500"
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

        {/* Top bar - Desktop */}
        <header className="hidden h-16 items-center justify-between border-b border-[#e0f0e9] bg-white px-8 lg:flex">
          <div className="flex flex-col">
            <h2 className="text-deep-green text-lg font-bold">
              {dashboardLabel}
            </h2>
            <p className="text-light-green text-xs">
              Welcome back to your dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(
                  isAdmin
                    ? "/admin-dashboard/profile"
                    : "/supplier-dashboard/profile",
                )
              }
              className="group hover:border-primary/50 relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#e0f0e9] bg-white transition-all"
              title="Profile"
            >
              {userAvatar && !imgError ? (
                <img
                  src={`${BASE_URL}${userAvatar}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <LuUser
                  size={20}
                  className="group-hover:text-primary text-[#5d8a7d] transition-colors"
                />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-100"
            >
              <LuLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
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
