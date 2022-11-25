import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";

export default function Logout() {
  // shared state
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user) setUser(false);
  }, []);
  
  const loggedOutState = {
    type: "info",
    message: "Logged out successfully"
  }

  return (
    <Navigate to="/" state={loggedOutState} replace />
  );
}
