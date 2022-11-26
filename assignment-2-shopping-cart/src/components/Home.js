import { Link, useLocation } from "react-router-dom";

import Alert from "./Alert";

export default function Home() {
  // state from router
  const { state } = useLocation();

  return (
    <div className="home">
      <h1 className="title-page">Home</h1>
      {state ? <Alert type={state.type} message={state.message} /> : null}
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
          </div>
          <div className="register card p-8 w-1/2">
            <h2 className="title-feature">Create a new account</h2>
            <div className="home-link">
              <Link to="/register" className="button">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
