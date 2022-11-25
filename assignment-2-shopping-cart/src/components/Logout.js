import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
export default function Logout(props) {
  // shared state
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user) setUser("");
  }, []);
  
  const loggedOutState = {
    type: "info",
    message: "Logged out successfully"
  }

  return (
    // <div className="user-logout">
    //   <h2>Logged out</h2>
    // </div>
    <Navigate to="/" state={loggedOutState} replace />
  );
}
