import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token || token === null || token === "") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default PublicRoute;
