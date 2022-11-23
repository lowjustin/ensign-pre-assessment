import Login from "./Login";
import Register from "./Register";

export default function Home(props) {
  const { isLoggedIn = false, user, setUser } = props;
  return (
    <div className="home">
      <h1 className="title-page">Home</h1>
      {user ? (
        <div className="home-loggedin">You are logged in</div>
      ) : (
        <div className="home-notloggedin flex gap-4">
          <div className="login w-1/2">
            <h2 className="title-feature">Existing users login here</h2>
            <Login user={user} setUser={setUser} />
          </div>
          <div className="register w-1/2">
            <h2 className="title-feature">Create a new account</h2>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
}
