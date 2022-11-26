export function formatPrice(price) {
  return (price).toLocaleString("en-SG", {
    style: "currency",
    currency: "SGD"
  });
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