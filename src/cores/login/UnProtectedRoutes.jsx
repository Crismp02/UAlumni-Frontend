import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

function UnProtectedRoutes() {
  const navigate = useNavigate();
  const cookieValue = false;
  if (cookieValue) {
    return navigate("/profile");
  }
  return <Outlet />;
}

export default UnProtectedRoutes;
