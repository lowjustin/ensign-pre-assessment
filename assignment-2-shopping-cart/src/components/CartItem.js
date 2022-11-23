import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "../lib/atoms";
import { AddToCart, DecrementCart, RemoveFromCart } from "./CartFunctions";
import { formatPrice } from "../helpers";

export default function CartItem(props) {
  const { index, product } = props;
  const [cart] = useAtom(cartAtom);

  return (
    <tr className="cart-item" key={index}>
      <td className="cart-item-title py-4 border-b border-blue-light">
        <Link to={`/product/${index}`}>{product.title}</Link>
      </td>
      <td className="cart-item-price py-4 border-b border-blue-light">
        {formatPrice(product.price)}
      </td>
      <td className="py-4 border-b border-blue-light">
        <DecrementCart index={index} />
      </td>
      <td className="cart-item-quantity align-center px-4 py-4 border-b border-blue-light">
        {cart[index]}
      </td>
      <td className="py-4 border-b border-blue-light">
        <AddToCart index={index} />
      </td>
      <td className="py-4 border-b border-blue-light">
        <RemoveFromCart index={index} />
      </td>
    </tr>
  );
}
