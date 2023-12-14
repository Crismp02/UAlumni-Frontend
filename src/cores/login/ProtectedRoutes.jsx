import React, {useEffect, useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import LoadingSpinner from "../../components/LoadingSpinner";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/auth/login-status', {
      method: 'GET',
      credentials: 'include', 
    })
    .then(response => {
      if (response.status === 401) {
        navigate("/");
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  }, [navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return <Outlet />;
}

export default ProtectedRoutes;
