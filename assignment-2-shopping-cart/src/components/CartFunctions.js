import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";

export function IncrementCart({ index, label = "+" }) {
  const [cart, setCart] = useAtom(cartAtom);

  const incrementCart = () => {
    let newCart = { ...cart };
    newCart[index] = cart[index] + 1 || 1;
    setCart(newCart);
  };

  return (
    <button className="button button-circle" onClick={() => incrementCart()}>
      {label}
    </button>
  );
}

export function DecrementCart({ index, label = "-" }) {
  const [cart, setCart] = useAtom(cartAtom);

  const decrementCart = () => {
    let newCart = { ...cart };
    newCart[index] = cart[index] - 1 || 0;
    if (newCart[index] <= 0) delete newCart[index];
    setCart(newCart);
  };

  return (
    <button className="button button-circle" onClick={() => decrementCart()}>
      {label}
    </button>
  );
}

export function RemoveFromCart({ index, label = "×" }) {
  const [cart, setCart] = useAtom(cartAtom);

  const removeFromCart = () => {
    let newCart = { ...cart };
    delete newCart[index];
    setCart(newCart);
  };

  return (
    <button className="button button-remove" onClick={() => removeFromCart()}>
      {label}
    </button>
  );
}

export function CartCount() {
  const [cart] = useAtom(cartAtom);

  const cartCount = () => {
    return Object.keys(cart).reduce((prevCount, key) => {
      const count = cart[key];
      return prevCount + count;
    }, 0);
  };

  return cartCount();
}
