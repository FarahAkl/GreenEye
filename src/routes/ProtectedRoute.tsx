import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/TS-Cookie";

const ProtectedRoute = () => {
  const token = getCookie({ name: "token" });

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
