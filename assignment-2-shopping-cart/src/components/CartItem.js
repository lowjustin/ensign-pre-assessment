import { Link } from "react-router-dom";
import { formatPrice } from "../helpers";

export default function CartItem(props) {
  const { index, cart, addToCart, decrementCart, removeFromCart, product } =
    props;

  return (
    <tr className="cart-item" key={index}>
      <td className="cart-item-title py-4 border-b border-blue-light">
        <Link to={`/product/${index}`}>{product.title}</Link>
      </td>
      <td className="cart-item-price py-4 border-b border-blue-light">
        {formatPrice(product.price)}
      </td>
      <td className="py-4 border-b border-blue-light">
        <button
          className="rounded-full w-8 align-center font-bold bg-brown text-white leading-8 hover:bg-brown-light transition"
          onClick={() => decrementCart(index)}
        >
          -
        </button>
      </td>
      <td className="cart-item-quantity align-center px-4 py-4 border-b border-blue-light">
        {cart[index]}
      </td>
      <td className="py-4 border-b border-blue-light">
        <button
          className="rounded-full w-8 align-center font-bold bg-brown text-white leading-8 hover:bg-brown-light transition"
          onClick={() => addToCart(index)}
        >
          +
        </button>
      </td>
      {/* <td className="cart-item-subtotal">{formatPrice(product.price * cart[index])}</td> */}
      <td className="py-4 border-b border-blue-light">
        <button
          className="rounded p-2 font-bold bg-brown-light text-brown leading-none hover:bg-brown hover:text-brown-light transition"
          onClick={() => removeFromCart(index)}
        >
          &times;
        </button>
      </td>
    </tr>
  );
}
