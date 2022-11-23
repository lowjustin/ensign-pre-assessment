import { useRef, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function Login(props) {
  // state from parents
  const { token, setToken } = props;

  // internal state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // internal refs
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const loginUser = async (event) => {
    event.preventDefault();
    
    setLoading(true);

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`http://localhost:4000/login`, user);
      setToken(response.data.token);
      setError(null);
      console.log("success", response.data);
    } catch (err) {
      console.log("error", err);
      setError(err.response.data);
      setToken("");
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
