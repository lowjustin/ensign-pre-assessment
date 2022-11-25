import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";

export function AddToCart(props) {
  const { index, label = "+", circle = true } = props;
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    let newCart = { ...cart };
    newCart[index] = cart[index] + 1 || 1;
    setCart(newCart);
  };

  return (
    <button
      className={
        circle
          ? "button button-circle"
          : "button"
      }
      onClick={() => addToCart()}
    >
      {label}
    </button>
  );
}

export function DecrementCart(props) {
  const { index, label = "-" } = props;
  const [cart, setCart] = useAtom(cartAtom);

  const decrementCart = () => {
    let newCart = { ...cart };
    newCart[index] = cart[index] - 1 || 0;
    if (newCart[index] <= 0) delete newCart[index];
    setCart(newCart);
  };

  return (
    <button
      className="button button-circle"
      onClick={() => decrementCart()}
    >
      {label}
    </button>
  );
}

export function RemoveFromCart(props) {
  const { index, label = "×" } = props;
  const [cart, setCart] = useAtom(cartAtom);

  const removeFromCart = () => {
    let newCart = { ...cart };
    delete newCart[index];
    setCart(newCart);
  };

  return (
    <button
      className="button button-remove"
      onClick={() => removeFromCart()}
    >
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

export function calcTotal(cart, products) {
  let total = 0.0;
  total = Object.keys(cart).reduce((prevTotal, key) => {
    const product = products.find((p) => p.id === parseInt(key));
    const count = cart[key];
    return prevTotal + count * product.price;
  }, 0);
  return total;
}
