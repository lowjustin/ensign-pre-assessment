import { useAtom } from "jotai";
import { loadProductsAtom } from "../lib/atoms";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import ProductItem from "./ProductItem";

export default function Products() {
  const [products] = useAtom(loadProductsAtom);

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        return renderProductItems(products.data);
      case "hasError":
        return <LoadingError />;
      default:
        return <LoadingSpinner />;
    }
  };

  const renderProductItems = (productsArr) => {
    return (
      <ul className="products-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(products.data).map((key) => (
          <ProductItem key={key} index={key} product={productsArr[key]} />
        ))}
      </ul>
    );
  };

  return (
    <div className="products">
      <h2 className="text-2xl text-gray mb-4">Products</h2>
      {renderContent()}
    </div>
  );
}
