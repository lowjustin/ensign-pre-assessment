import { useAtom } from "jotai";
import { userAtom } from "../lib/atoms";
import Navigation from "./Navigation";

export default function Header() {
  // shared state
  const [user] = useAtom(userAtom);

  return (
    <header className="flex justify-end p-8">
      <div>
        {user ? (
          <div className="mb-4 text-right text-sm text-gray">
            Logged in as <span className="font-bold">{user.username}</span>
          </div>
        ) : null}
        <Navigation />
      </div>
    </header>
  );
}
