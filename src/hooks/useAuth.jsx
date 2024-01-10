import * as React from "react";
import { loginUser, logoutUser } from "../services/auth/Auth.services";

const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    async login(email, password) {
      try {
        const response = await loginUser(email, password);
        setAuthed(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    async logout() {
      try {
        const response = await logoutUser();
        if (response) {
          setAuthed(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
