import { useAtom } from "jotai";
import { cartAtom, productsAtom } from "../lib/atoms";

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
          ? "rounded-full w-8 align-center font-bold bg-brown text-white leading-8 hover:bg-brown-light transition"
          : "rounded p-4 px-8 font-bold bg-brown text-white leading-none hover:bg-brown-light hover:text-brown transition"
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
      className="rounded-full w-8 align-center font-bold bg-brown text-white leading-8 hover:bg-brown-light transition"
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
      className="rounded p-2 font-bold bg-brown-light text-brown leading-none hover:bg-brown hover:text-brown-light transition"
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
