import { useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../features/auth/hooks/useAuth";
import useOutsideClick from "../hooks/useOutsideClick";
import ScrollToHash from "./ScrollToHash";
import Button from "./Button";
import { logout } from "../features/auth/services/apiAuth";

type NavItem = {
  label: string;
  to: string;
  match: (pathname: string, hash: string) => boolean;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    to: "/",
    match: (pathname, hash) => pathname === "/" && hash !== "#about",
  },
  {
    label: "MarketPlace",
    to: "/marketplace",
    match: (pathname) => pathname.startsWith("/marketplace"),
  },
  {
    label: "Products",
    to: "/products",
    match: (pathname) =>
      pathname.startsWith("/products") || pathname.startsWith("/product/"),
  },
  {
    label: "Orders",
    to: "/orders",
    match: (pathname) =>
      pathname.startsWith("/orders") || pathname.startsWith("/order"),
  },
  {
    label: "About Us",
    to: "/#about",
    match: (pathname, hash) => pathname === "/" && hash === "#about",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(mobileMenuRef, () => setOpen(false));

  const pathname = location.pathname;
  const hash = location.hash;

  const activeItem = useMemo(
    () => navItems.find((item) => item.match(pathname, hash))?.label,
    [hash, pathname],
  );

  const iconClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-gray-600 transition-all duration-200 hover:border-primary/20 hover:bg-primary/10 hover:text-dark";

  const linkBaseClass =
    " px-4 py-2 text-sm font-medium transition-all duration-200 outline-none";

  const getLinkClass = (label: string) =>
    `${linkBaseClass} ${
      activeItem === label ? "text-primary" : "text-gray-600  hover:text-dark"
    }`;

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <header className="sticky top-0 left-0 z-1000 border-b border-white/60 bg-[#f7fbf8]/85 px-4 shadow-[0_10px_40px_rgba(0,47,32,0.08)] backdrop-blur-xl sm:px-6 md:px-10 lg:px-16">
      <ScrollToHash />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full pr-2 transition-opacity hover:opacity-90"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
        >
          <img src="/images/logo.png" alt="logo" className="h-12 shrink-0" />
          <div className="flex flex-col items-start">
            <div className="text-lg leading-none font-bold">
              <span className="text-[#04591B]">Green</span>
              <span className="text-[#79C010]">Eye</span>
            </div>
          </div>
        </button>

        <nav className="hidden items-center rounded-full p-1.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={getLinkClass(item.label)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div ref={mobileMenuRef} className="relative flex items-center gap-2">
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => navigate("/cart")}
                className={iconClass}
                aria-label="Cart"
              >
                <TiShoppingCart size={24} />
              </button>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className={`${iconClass} hover:border-red-200 hover:bg-red-50 hover:text-red-500`}
              >
                <LuLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2.5 md:flex">
              <Button
                color="primary"
                variant="outline"
                onClick={() => navigate("/login")}
                btnLabel="Login"
                className="rounded-full px-5"
              />
              <Button
                color="primary"
                variant="filled"
                onClick={() => navigate("/signup")}
                btnLabel="Sign up"
                className="rounded-full px-5 shadow-[0_12px_24px_rgba(55,155,137,0.18)]"
              />
            </div>
          )}

          <button
            className="text-dark flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/80 text-2xl transition-all duration-200 hover:bg-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>

          {open && (
            <>
              <div className="bg-dark/20 fixed inset-0 top-18 z-40 backdrop-blur-[2px] md:hidden" />
              <div className="absolute top-14 right-0 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-4 shadow-[0_24px_60px_rgba(0,47,32,0.18)] backdrop-blur-xl md:hidden">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        activeItem === item.label
                          ? "bg-primary text-white shadow-[0_10px_24px_rgba(55,155,137,0.2)]"
                          : "bg-[#f4f9f6] text-[#355a4d] hover:bg-[#ebf5f0]"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {isAuthenticated ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        navigate("/cart");
                        closeMenu();
                      }}
                      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f4f9f6] text-sm font-semibold text-[#355a4d] transition-all hover:bg-[#ebf5f0]"
                    >
                      <TiShoppingCart size={20} />
                      Cart
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-500 transition-all hover:bg-red-100"
                    >
                      <LuLogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      color="primary"
                      variant="outline"
                      onClick={() => {
                        navigate("/login");
                        closeMenu();
                      }}
                      btnLabel="Login"
                      className="w-full rounded-2xl"
                    />
                    <Button
                      color="primary"
                      variant="filled"
                      onClick={() => {
                        navigate("/signup");
                        closeMenu();
                      }}
                      btnLabel="Sign up"
                      className="w-full rounded-2xl shadow-[0_12px_24px_rgba(55,155,137,0.18)]"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
