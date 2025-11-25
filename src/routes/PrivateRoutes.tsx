import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Spinner } from "../components/ui/spinner";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Spinner className="text-white h-10 w-10" />;
  }
  if (!isAuthenticated && !user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  if (user?.plan !== "pro") {
    return <Navigate to={"/pricing"} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
