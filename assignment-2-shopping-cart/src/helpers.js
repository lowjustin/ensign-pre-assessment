export function formatPrice(price) {
  return (price).toLocaleString("en-SG", {
    style: "currency",
    currency: "SGD"
  });
}