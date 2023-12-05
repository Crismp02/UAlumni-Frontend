import React from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const user = "ualumni-session";
  let cookieValue = document.cookie.replace(
    /(?:(?:^|.;\s)ualumni-session\s=\s([^;]).$)|^.*$/, "$1"
  );
  if (!cookieValue) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
