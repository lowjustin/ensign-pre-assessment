import LoadingSpinner from "./LoadingSpinner";
import ProductItem from "./ProductItem";

export default function Products(props) {
  const { products, loading } = props;

  const renderProductItems = (products) => {
    return (
      <ul className="products-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(products).map((key) => (
          <ProductItem key={key} index={key} product={products[key]} />
        ))}
      </ul>
    );
  };

  return (
    <div className="products">
      <h2 className="text-2xl text-gray mb-4">Products</h2>
      {/* show loader if products not loaded, else render product items */}
      {loading ? <LoadingSpinner /> : renderProductItems(products)}
    </div>
  );
}
