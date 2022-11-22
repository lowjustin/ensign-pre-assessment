import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";

export default function CartCount() {
  const [cart] = useAtom(cartAtom);

  const cartCount = () => {
    return Object.keys(cart).reduce((prevCount, key) => {
      const count = cart[key];
      return prevCount + count;
    }, 0);
  };

  return cartCount();
}
