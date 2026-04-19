import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useScrollToTop } from "../hooks/useScrollToTop";

const AuthLayout = () => {
  useScrollToTop();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="relative flex flex-1 items-center justify-center">
        <img
          src="/images/authBG.png"
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 mx-3 my-5 flex min-h-full">
          <div className="rounded-2xl bg-white px-8 py-6 shadow-2xl">
            <Outlet />
          </div>
        </div>

        <div id="modal-root"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
