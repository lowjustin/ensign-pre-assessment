import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
import axios from "axios";
import Alert from "./Alert";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {
  // shared state
  const [user, setUser] = useAtom(userAtom);

  // internal state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // internal refs
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const loginUser = async (event) => {
    event.preventDefault();

    setLoading(true);

    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, payload);
      const { userId, username, token } = response.data;
      setUser({ userId, username, token });
      setError(null);
    } catch (error) {
      setError(error);
      setUser("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login">
      <h3 className="title-section">Login</h3>
      <form onSubmit={loginUser}>
        {error ? <Alert type="error" message="Incorrect username or password" /> : ""}
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            className="input"
            name="username"
            ref={usernameRef}
            type="text"
            placeholder="username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            name="password"
            ref={passwordRef}
            type="password"
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      {loading ? <LoadingSpinner /> : ""}
    </div>
  );
}
