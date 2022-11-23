import { formatPrice } from "../helpers";

export default function OrderItem(props) {
  const { index, product, quantity } = props;

  return (
    <tr className="order-item" key={index}>
      <td className="order-item-title py-4 border-b border-blue-light">
        {product.title}
      </td>
      <td className="order-item-price py-4 border-b border-blue-light">
        {formatPrice(product.price)}
      </td>
      <td className="order-item-price py-4 border-b border-blue-light">
        {quantity}
      </td>
    </tr>
  );
}
