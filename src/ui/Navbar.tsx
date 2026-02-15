import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../features/auth/hooks/useAuth";
import useOutsideClick from "../hooks/useOutsideClick";
import ScrollToHash from "./ScrollToHash";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(mobileMenuRef, () => setOpen(false));

  return (
    <header className="flex h-18 w-full items-center justify-between px-8 shadow-sm md:px-12 lg:px-24">
      <div className="flex items-center gap-1">
        <img src="/images/logo.png" alt="logo" className="h-12" />
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
          to={"/#marketplace"}
          className="hover:text-dark transition duration-75 outline-none"
        >
          MarketPlace
        </Link>
        <Link
          to={"/#products"}
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

      <div className="hidden items-center gap-2.5 md:flex">
        {!isAuthenticated && (
          <>
            <Button
              color="secondary"
              variant="outline"
              onClick={() => navigate("/login")}
              btnLabel="Login"
            />
            <Button
              color="secondary"
              variant="filled"
              onClick={() => navigate("/signup")}
              btnLabel="Sign up"
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <div
              className="text-dark cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <TiShoppingCart size={24} />
            </div>
            <div
              className="text-dark cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <CgProfile size={24} />
            </div>
          </div>
        )}
        <button
          className="text-dark cursor-pointer text-3xl md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div
          ref={mobileMenuRef}
          className="text-black-600 absolute top-16 left-0 z-50 flex w-full flex-col gap-4 bg-white p-6 px-18 text-center text-sm shadow-md md:hidden"
        >
          <Link
            to={"/"}
            className="py-2 outline-none"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to={"/#marketplace"}
            className="py-2 outline-none"
            onClick={() => {
              setOpen(false);
            }}
          >
            MarketPlace
          </Link>
          <Link
            to={"/#products"}
            className="py-2 outline-none"
            onClick={() => {
              setOpen(false);
            }}
          >
            Products
          </Link>
          <Link
            to={"/#about"}
            className="py-2 outline-none"
            onClick={() => {
              setOpen(false);
            }}
          >
            About Us
          </Link>

          {!isAuthenticated && (
            <div className="mt-3 flex flex-col gap-3 shadow-2xl">
              <Button
                color="secondary"
                variant="outline"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                btnLabel={"Login"}
              />
              <Button
                color="secondary"
                variant="filled"
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
                btnLabel={"Sign up"}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
