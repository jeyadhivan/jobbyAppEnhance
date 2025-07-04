import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const jwtToken = Cookies.get("jwt_token");

  return jwtToken !== undefined ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
