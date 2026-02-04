import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollToTop } from "../hooks/useScrollToTop";

const AppLayout = () => {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="relative mx-auto w-full flex-1">
        <Outlet />
        <div id="modal-root"></div>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
