import { Navigate } from 'react-router-dom';

import DashboardLayout from '../components/Layout';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const role = useSelector((data) => data.user.role);
  return role ? <DashboardLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
