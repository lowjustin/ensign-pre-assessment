import { useAtom } from "jotai";
import { tokenAtom } from "../lib/atoms";

export default function Logout() {
  const [token, setToken] = useAtom(tokenAtom);

  if (token) setToken("");

  return (
    <div className="user-logout">
      <h2>Logged out</h2>
    </div>
  );
}
