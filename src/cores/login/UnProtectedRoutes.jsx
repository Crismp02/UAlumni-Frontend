import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BASE_URL } from "../../config";
import { Flex } from "@chakra-ui/react";

function UnProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStatusCheck = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/login-status`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.statusCode === 200) {
          navigate("/profile");
        }
      } catch (error) {
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

export default UnProtectedRoutes;
