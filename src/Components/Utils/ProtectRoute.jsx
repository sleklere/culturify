import { Navigate } from "react-router-dom";
import { getAuthToken } from "./AuthVerify";

function ProtectRoute({ children }) {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default ProtectRoute;
