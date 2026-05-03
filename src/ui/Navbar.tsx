import { useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { LuLogOut, LuUser } from "react-icons/lu";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useProfile } from "../features/profile/hooks/useProfile";
import useOutsideClick from "../hooks/useOutsideClick";
import ScrollToHash from "./ScrollToHash";
import Button from "./Button";
import { logout } from "../features/auth/services/apiAuth";

type NavItem = {
  label: string;
  to: string;
  match: (pathname: string, hash: string) => boolean;
};

const BASE_URL = import.meta.env.VITE_API_URL;

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
  const { profileData } = useProfile(undefined, isAuthenticated);
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const userAvatar = profileData?.data?.profileImageUrl || '';

  return (
    <header className="sticky top-0 left-0 z-1000 border-b border-gray-300/60 bg-gray-200/50 px-4 shadow-navbar backdrop-blur-2xl sm:px-6 md:px-10 lg:px-16">
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
              <span className="text-brand-green">Green</span>
              <span className="text-brand-lime">Eye</span>
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
                onClick={() => navigate("/profile")}
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border-green bg-white transition-all hover:border-primary/50"
                aria-label="Profile"
              >
                {userAvatar && !imgError ? (
                  <img 
                    src={`${BASE_URL}${userAvatar}`} 
                    alt="Profile" 
                    className="h-full w-full object-cover" 
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <LuUser size={24} className="text-gray-600 transition-colors group-hover:text-primary" />
                )}
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
                className="rounded-full px-5 shadow-primary-button"
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
              <div className="absolute top-14 right-0 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-4 shadow-mobile-menu backdrop-blur-xl md:hidden">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        activeItem === item.label
                          ? "bg-primary text-white shadow-mobile-active"
                          : "bg-page-green text-nav-green hover:bg-pale-green"
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
                      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-page-green text-sm font-semibold text-nav-green transition-all hover:bg-pale-green"
                    >
                      <TiShoppingCart size={20} />
                      Cart
                    </button>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        closeMenu();
                      }}
                      className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-page-green text-sm font-semibold text-nav-green transition-all hover:bg-pale-green"
                    >
                      <LuUser size={20} />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="col-span-2 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-500 transition-all hover:bg-red-100"
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
                      className="w-full rounded-2xl shadow-primary-button"
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
