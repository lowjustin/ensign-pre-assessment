import { Link, Navigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";

import Alert from "./Alert";
// import Login from "./Login";
// import Register from "./Register";

export default function Home() {
  // state from router
  const { state } = useLocation();

  // shared state
  const [user, setUser] = useAtom(userAtom);

  const loggedInState = {
    type: "success",
    message: "Logged in successfully",
  };

  return (
    <div className="home">
      <h1 className="title-page">Home</h1>
      {state ? <Alert type={state.type} message={state.message} /> : null}
      {user ? (
        <Navigate to="/products" state={loggedInState} replace />
      ) : (
        <div className="home-notloggedin">
          <div className="welcome-message px-8 mb-8">
            <h2 className="title-section">Welcome</h2>
            <p>Thank you for trying out my shopping cart!</p>
          </div>
          <div className="flex gap-8">
            <div className="login card p-8 w-1/2">
              <h2 className="title-feature">Existing users login here</h2>
              <div className="home-link">
                <Link to="/login" className="button">
                  Login
                </Link>
              </div>
              {/* <Login user={user} setUser={setUser} /> */}
            </div>
            <div className="register card p-8 w-1/2">
              <h2 className="title-feature">Create a new account</h2>
              <div className="home-link">
                <Link to="/register" className="button">
                  Register
                </Link>
              </div>
              {/* <Register /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
