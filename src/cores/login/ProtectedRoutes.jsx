import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const cookieValue = true;
  if (!cookieValue) {
    return navigate("/");
  }
  return <Outlet />;
}

export default ProtectedRoutes;
