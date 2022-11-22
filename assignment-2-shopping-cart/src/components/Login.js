import { useRef, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { tokenAtom } from "../lib/atoms";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {
  const [token, setToken] = useAtom(tokenAtom);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const loginUser = async (event) => {
    event.preventDefault();

    if (token) {
      console.log("already logged in");
      return;
    }

    setLoading(true);

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(`http://localhost:4000/login`, user);
      setToken(res.data.token);
      setError(null);
      console.log("success", res.data);
    } catch (err) {
      console.log("error", err);
      setError(err.response.data);
      setToken({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            ref={usernameRef}
            type="text"
            placeholder="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" ref={passwordRef} type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error ? JSON.stringify(error) : ""}
      {loading ? <LoadingSpinner /> : ""}
    </div>
  );
}
