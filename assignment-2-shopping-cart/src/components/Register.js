import { useRef, useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import LoadingSpinner from "./LoadingSpinner";

export default function Register() {
  // internal state
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // internal refs
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const registerUser = async (event) => {
    event.preventDefault();

    setLoading(true);

    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, payload);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register">
      <h3 className="title-section">Register user</h3>
      <form onSubmit={registerUser}>
        {error ? <Alert type="error" message="Could not register new user" /> : ""}
        {data ? <Alert type="success" message="Registered successfully" /> : ""}
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
