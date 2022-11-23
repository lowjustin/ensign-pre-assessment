export default function Logout(props) {
  // state from parents
  const { user, setUser } = props;

  if (user) setUser("");

  return (
    <div className="user-logout">
      <h2>Logged out</h2>
    </div>
  );
}
