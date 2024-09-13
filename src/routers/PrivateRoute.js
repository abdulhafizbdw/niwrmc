import { Navigate } from "react-router-dom";
import auth from "../pages/authentication";
import DashboardLayout from "../components/Layout";

const PrivateRoute = ({ children }) => {
  return auth.isUser ? <DashboardLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
