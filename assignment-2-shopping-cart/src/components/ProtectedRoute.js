import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ redirectPath = "/" }) {
  // shared state
  const [user, setUser] = useAtom(userAtom);
  
  // internal state
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `token ${user.token}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/login/verify`,
          config
        );
        setAuth(true);
        setError("");
      } catch (error) {
        setAuth(false);
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) verifyToken();
  }, [location.pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!auth) {
    setUser(false);
  
    const invalidTokenState = {
      type: "info",
      message: "Invalid access token"
    }

    return <Navigate to={redirectPath} state={invalidTokenState} replace />;
  }

  return <Outlet />;
};