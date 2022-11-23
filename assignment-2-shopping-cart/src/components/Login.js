import { useRef, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function Login(props) {
  // state from parents
  const { user, setUser } = props;

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
      const response = await axios.post(`http://localhost:4000/login`, payload);
      const { userId, username, token } = response.data;
      setUser({ userId, username, token });
      setError(null);
      // console.log("success", response.data);
    } catch (err) {
      console.log("error", err);
      // setError(err.response.data);
      setUser("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login">
      <h3 className="title-section">Login</h3>
      <form onSubmit={loginUser}>
        <div>
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
        <div>
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
      {error ? JSON.stringify(error) : ""}
      {loading ? <LoadingSpinner /> : ""}
    </div>
  );
}
