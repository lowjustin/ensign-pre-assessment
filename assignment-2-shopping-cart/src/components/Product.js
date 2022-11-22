import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { loadProductsAtom } from "../lib/atoms";
import { formatPrice } from "../helpers";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";

export default function Product(props) {
  const [products] = useAtom(loadProductsAtom);

  const { productId } = useParams();
  const { addToCart } = props;

  const renderProduct = (product, addToCart) => {
    const { id, image, price, title, description } = product;
    return (
      <div className="product md:flex border border-blue rounded p-8 gap-4">
        <div className="product-image grow h-96 md:max-h-96 overflow-hidden mb-8 md:mb-0">
          <img
            className="object-contain object-center w-full h-full"
            src={image}
          />
        </div>
        <div className="product-data md:w-2/3 text-gray-dark">
          <div className="product-title text-3xl text-blue-dark mb-4">
            {title}
          </div>
          <div className="product-price text-xl text-gray mb-4">
            {formatPrice(price)}
          </div>
          <div className="product-description mb-4">
            <p>{description}</p>
          </div>
          <button
            onClick={() => addToCart(id)}
            className="rounded p-4 px-8 font-bold bg-brown text-white leading-none hover:bg-brown-light hover:text-brown transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        const product = products.data.find((p) => p.id === parseInt(productId));
        return renderProduct(product, addToCart);
      case "hasError":
        return <LoadingError />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-gray mb-4">Product</h2>
      {renderContent()}
    </div>
  );
}
