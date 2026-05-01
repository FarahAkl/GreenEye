import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import MarketPlace from "../pages/MarketPlace";
import ProductDetails from "../pages/ProductDetails";
import AuthLayout from "../ui/AuthLayout";
import AppLayout from "../ui/AppLayout";
import DashboardLayout from "../ui/DashboardLayout";
import Cart from "../pages/Cart";
import ResetPassword from "../features/auth/pages/ResetPassword";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import OrderConfirmation from "../features/orders/ui/OrderConfirmation";
import OTP from "../features/auth/pages/OTP";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import PublicRoleGuard from "./PublicRoleGuard";
import Home from "../pages/Home";
import Register from "../features/auth/pages/Register";
import Products from "../pages/Products";
import Order from "../pages/Order";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AllUsers from "../features/admin/pages/AllUsers";
import PendingUsers from "../features/admin/pages/PendingUsers";
import PendingProducts from "../features/admin/pages/PendingProducts";
import AllProducts from "../features/admin/pages/AllProducts";
import PendingUpdates from "../features/admin/pages/PendingUpdates";
import Categories from "../features/admin/pages/Categories";
import AddCategory from "../features/admin/pages/AddCategory";
import AllWallets from "../features/admin/pages/AllWallets";
import PendingWithdrawals from "../features/admin/pages/PendingWithdrawals";
import UserActivity from "../features/admin/pages/UserActivity";
import SupplierActivity from "../features/admin/pages/SupplierActivity";
import SupplierWallet from "../features/supplier/pages/SupplierWallet";
import SupplierDashboard from "../features/supplier/pages/SupplierDashboard";
import SupplierProducts from "../features/supplier/pages/SupplierProducts";
import SupplierOrders from "../features/supplier/pages/SupplierOrders";
import AddProducts from "../features/supplier/pages/AddProducts";

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
      {
        element: <PublicRoleGuard />,
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
            ],
          },
        ],
      },
    ],
  },

  // Dashboard routes — separate layout, no main Navbar/Footer
  {
    element: <DashboardLayout />,
    children: [
      {
        element: <RoleProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { path: "/admin-dashboard", element: <AdminDashboard /> },
          { path: "/admin-dashboard/users/pending", element: <PendingUsers /> },
          { path: "/admin-dashboard/users/all", element: <AllUsers /> },
          { path: "/admin-dashboard/users/:userId/activity", element: <UserActivity /> },
          { path: "/admin-dashboard/users/:userId/supplier-activity", element: <SupplierActivity /> },
          {
            path: "/admin-dashboard/products/pending",
            element: <PendingProducts />,
          },
          {
            path: "/admin-dashboard/products/all",
            element: <AllProducts />,
          },
          {
            path: "/admin-dashboard/products/updates",
            element: <PendingUpdates />,
          },
          { path: "/admin-dashboard/categories", element: <Categories /> },
          { path: "/admin-dashboard/categories/add", element: <AddCategory /> },
          // { path: "/admin-dashboard/orders", element: <AdminDashboard /> },
          {
            path: "/admin-dashboard/withdrawals/requests",
            element: <PendingWithdrawals />,
          },
          {
            path: "/admin-dashboard/withdrawals/wallets",
            element: <AllWallets />,
          },
          { path: "/admin-dashboard/categories", element: <AdminDashboard /> },
          { path: "/admin-dashboard/profile", element: <Profile /> },
        ],
      },
      {
        element: <RoleProtectedRoute allowedRoles={["supplier"]} />,
        children: [
          { path: "/supplier-dashboard", element: <SupplierDashboard /> },
          {
            path: "/supplier-dashboard/my-products",
            element: <SupplierProducts />,
          },
          {
            path: "/supplier-dashboard/my-products/add",
            element: <AddProducts />,
          },
          {
            path: "/supplier-dashboard/orders",
            element: <SupplierOrders />,
          },
          {
            path: "/supplier-dashboard/wallet",
            element: <SupplierWallet />,
          },
          { path: "/supplier-dashboard/profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
