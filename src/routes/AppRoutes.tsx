import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import MarketPlace from "../pages/MarketPlace";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import AuthLayout from "../ui/AuthLayout";
import AppLayout from "../ui/AppLayout";
import Cart from "../pages/Cart";
import ResetPassword from "../pages/ResetPassword";
import ForgetPassword from "../pages/ForgetPassword";
import OTP from "../pages/OTP";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/verify-otp", element: <OTP /> },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/marketplace", element: <MarketPlace /> },
      { path: "/product/:id", element: <ProductDetails /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/profile", element: <Profile /> },
          { path: "/payment", element: <Payment /> },
        ],
      },
    ],
  },

  { path: "*", element: <PageNotFound /> },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
