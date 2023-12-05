import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import LandingPage from '../landingpage/LandingPage';
import Login from './Login';
import Register from '../register/Register';

function UnProtectedRoutes() {
  const user = "ualumni-session";
  let cookieValue = document.cookie.replace(
    /(?:(?:^|.;\s)ualumni-session\s=\s([^;]).$)|^.*$/, "$1"
  );
  if (cookieValue) {
    return <Navigate to="/profile" />;
  }
  return <Outlet/>;
}

export default UnProtectedRoutes;