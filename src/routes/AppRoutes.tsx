import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import MarketPlace from "../pages/MarketPlace";
import ProductDetails from "../pages/ProductDetails";
import AuthLayout from "../ui/AuthLayout";
import AppLayout from "../ui/AppLayout";
import Cart from "../pages/Cart";
import ResetPassword from "../features/auth/pages/ResetPassword";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import OrderConfirmation from "../features/orders/ui/OrderConfirmation";
import OTP from "../features/auth/pages/OTP";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Register from "../features/auth/pages/Register";
import Products from "../pages/Products";
import Order from "../pages/Order";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
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
      { path: "/products", element: <Products /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "*", element: <PageNotFound /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/order", element: <Order /> },
          {
            path: "/order/:orderId/confirmation",
            element: <OrderConfirmation />,
          },
          { path: "/orders", element: <MyOrders /> },
          { path: "/order/:orderId", element: <OrderDetails /> },
          { path: "/profile", element: <Profile /> },
          { path: "/supplier-dashboard" },
          { path: "/admin-dashboard" },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
