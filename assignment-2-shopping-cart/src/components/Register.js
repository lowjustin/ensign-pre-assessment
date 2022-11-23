import { useRef, useState } from "react";
import axios from "axios";
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

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`http://localhost:4000/users`, user);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register">
      <h2>Register user</h2>
      <form onSubmit={registerUser}>
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
      {data ? JSON.stringify(data) : ""}
      {error ? JSON.stringify(error) : ""}
      {loading ? <LoadingSpinner /> : ""}
    </div>
  );
}
