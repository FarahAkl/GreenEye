import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const PublicRoleGuard = () => {
  const { isAuthenticated, roles } = useAuth();

  if (isAuthenticated) {
    const lowerRoles = roles.map((r) => r.toLowerCase());

    if (lowerRoles.includes("admin")) {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (lowerRoles.includes("supplier")) {
      return <Navigate to="/supplier-dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoleGuard;
