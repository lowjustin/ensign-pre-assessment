import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { loadProductsAtom } from "../lib/atoms";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import ProductItem from "./ProductItem";
import Alert from "./Alert";

export default function Products() {
  // state from router
  const { state } = useLocation();

  // shared state
  const [products] = useAtom(loadProductsAtom);

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        return renderProductItems(products.data);
      case "hasError":
        return <LoadingError message="Error loading products" />;
      default:
        return <LoadingSpinner />;
    }
  };

  const renderProductItems = (items) => {
    return (
      <ul className="products-list grid grid-cols-2 md:grid-cols-3 gap-8">
        {Object.keys(items).map((key) => (
          <ProductItem key={key} index={key} product={items[key]} />
        ))}
      </ul>
    );
  };

  return (
    <div className="products">
      <h1 className="title-page">Products</h1>
      {state ? <Alert type={state.type} message={state.message} /> : null}
      {renderContent()}
    </div>
  );
}
