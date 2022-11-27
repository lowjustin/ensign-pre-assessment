import { formatPrice } from "../helpers";

export default function OrderItem({ index, product, quantity }) {
  return (
    <tr className="order-item" key={index}>
      <td className="order-item-title">{product.title}</td>
      <td className="order-item-price">{formatPrice(product.price)}</td>
      <td className="order-item-price text-right">{quantity}</td>
    </tr>
  );
}
