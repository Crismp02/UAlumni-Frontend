import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

function UnProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:3000/auth/login-status', {
      method: 'GET',
      credentials: 'include', 
    })
    .then(response => {
      if (response.statusCode === 200) {
        navigate("/profile");
      }
      setIsLoading(false);
    })
    .catch(error => console.error('Error:', error));
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return <Outlet />;
}

export default UnProtectedRoutes;
