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
        console.error(error);
      }
    },
    async logout() {
      try {
        const response = await logoutUser();
        if (response) {
          setAuthed(false);
        }
      } catch (error) {
        console.error(error);
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
