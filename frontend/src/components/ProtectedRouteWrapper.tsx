import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ requiresAuth }: { requiresAuth: boolean }) => {
  const location = useLocation();

  // unauthenticated user attempting to access protected route
  // if (requiresAuth && !isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  // logged in user attempting to go back to auth page
  // else if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
