import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BASE_URL } from "../../config";
import { Flex } from "@chakra-ui/react";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStatusCheck = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/login-status`, {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 401) {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    loginStatusCheck();
  }, [navigate]);

  if (isLoading) {
    return (
      <Flex alignItems="center" height="100vh" width="100vw">
        <LoadingSpinner />
      </Flex>);
  }

  return <Outlet />;
}

export default ProtectedRoutes;
