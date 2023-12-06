import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

function UnProtectedRoutes() {
  const user = "ualumni-session";
  const navigate = useNavigate();
  let cookieValue = document.cookie.replace(
    /(?:(?:^|.;\s)ualumni-session\s=\s([^;]).$)|^.*$/,
    "$1"
  );
  if (cookieValue) {
    return navigate("/profile");
  }
  return <Outlet />;
}

export default UnProtectedRoutes;
