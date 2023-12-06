import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes({ cookie }) {
  const user = "ualumni-session";

  let cookieValue = document.cookie.replace(
    /(?:(?:^|.;\s)ualumni-session\s=\s([^;]).$)|^.*$/,
    "$1"
  );
  const navigate = useNavigate();
  if (!cookieValue) {
    return navigate("/");
  }
  return <Outlet />;
}

export default ProtectedRoutes;
