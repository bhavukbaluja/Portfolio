import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
