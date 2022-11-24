import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
export default function Logout(props) {
  // shared state
  const [user, setUser] = useAtom(userAtom);

  if (user) setUser("");

  return (
    <div className="user-logout">
      <h2>Logged out</h2>
    </div>
  );
}
