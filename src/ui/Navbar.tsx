import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
// import { CgProfile } from "react-icons/cg";
import { useAuth } from "../features/auth/hooks/useAuth";
import useOutsideClick from "../hooks/useOutsideClick";
import ScrollToHash from "./ScrollToHash";
import Button from "./Button";
import { logout } from "../features/auth/services/apiAuth";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(mobileMenuRef, () => setOpen(false));

  const iconClass =
    "text-gray-600 hover:text-dark cursor-pointer transition duration-150";

  return (
    <header className="sticky top-0 left-0 z-1000 flex h-18 w-full items-center justify-between bg-white/60 px-8 shadow-md backdrop-blur-md md:px-12 lg:px-24">
      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={() => navigate("/")}
      >
        <img src="/images/logo.png" alt="logo" className="h-12 shrink-0" />
        <div className="hidden text-lg font-bold lg:flex">
          <p className="text-[#04591B]">Green</p>
          <p className="text-[#79C010]">Eye</p>
        </div>
      </div>

      <nav className="hidden flex-1 items-center justify-center gap-10 text-base text-gray-600 md:flex">
        <ScrollToHash />
        <Link
          to={"/"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          Home
        </Link>
        <Link
          to={"/marketplace"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          MarketPlace
        </Link>
        <Link
          to={"/products"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          Products
        </Link>
        <Link
          to={"/#orders"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          Orders
        </Link>
        <Link
          to={"/#about"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          About Us
        </Link>
      </nav>

      <div className="flex items-center gap-1">
        {isAuthenticated ? (
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/cart")}
              className={iconClass}
              aria-label="Cart"
            >
              <TiShoppingCart size={26} />
            </button>
            {/* <button
              onClick={() => navigate("/profile")}
              className={iconClass}
              aria-label="Profile"
            >
              <CgProfile size={24} />
            </button> */}
            <button
              onClick={logout}
              aria-label="Logout"
              className="cursor-pointer text-gray-600 transition duration-150 hover:text-red-500"
            >
              <LuLogOut size={22} color="red" />
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-2.5 md:flex">
            <Button
              color="primary"
              variant="outline"
              onClick={() => navigate("/login")}
              btnLabel="Login"
            />
            <Button
              color="primary"
              variant="filled"
              onClick={() => navigate("/signup")}
              btnLabel="Sign up"
            />
          </div>
        )}

        <button
          className="text-dark cursor-pointer text-3xl transition duration-150 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 left-0 z-50 flex w-full flex-col gap-4 bg-white p-6 px-18 text-center text-sm text-gray-600 shadow-md md:hidden"
        >
          <Link
            to={"/"}
            className="py-2 outline-none"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to={"/marketplace"}
            className="py-2 outline-none"
            onClick={() => setOpen(false)}
          >
            MarketPlace
          </Link>
          <Link
            to={"/products"}
            className="py-2 outline-none"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            to={"/#about"}
            className="py-2 outline-none"
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>

          {!isAuthenticated && (
            <div className="mt-3 flex flex-col gap-3">
              <Button
                color="secondary"
                variant="outline"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                btnLabel="Login"
              />
              <Button
                color="secondary"
                variant="filled"
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
                btnLabel="Sign up"
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
