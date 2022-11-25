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
      <td className="cart-item-title">
        <Link to={`/product/${index}`}>{product.title}</Link>
      </td>
      <td className="cart-item-price">
        {formatPrice(product.price)}
      </td>
      <td className="">
        <DecrementCart index={index} />
      </td>
      <td className="cart-item-quantity align-center px-4">
        {cart[index]}
      </td>
      <td className="">
        <AddToCart index={index} />
      </td>
      <td className="">
        <RemoveFromCart index={index} />
      </td>
    </tr>
  );
}
