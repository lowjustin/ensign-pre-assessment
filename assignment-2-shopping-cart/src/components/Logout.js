export default function Logout(props) {
  // state from parents
  const { token, setToken } = props;

  if (token) setToken("");

  return (
    <div className="user-logout">
      <h2>Logged out</h2>
    </div>
  );
}
