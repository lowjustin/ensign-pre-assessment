import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { loadProductsAtom } from "../lib/atoms";
import { formatPrice } from "../helpers";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import { AddToCart } from "./CartFunctions";

export default function Product() {
  const [products] = useAtom(loadProductsAtom);

  const { productId } = useParams();

  const renderProduct = (product) => {
    const { id, image, price, title, description } = product;
    return (
      <div className="product card w-3/4 mx-auto flex p-16 gap-8">
        <div className="product-image grow h-96 md:max-h-96 overflow-hidden mb-8 md:mb-0">
          <img
            className="object-contain object-center w-full h-full"
            src={image} alt=""
          />
        </div>
        <div className="product-data md:w-2/3 text-gray-dark flex flex-col">
          <div className="product-title text-3xl text-blue-dark mb-4">
            {title}
          </div>
          <div className="product-price text-xl text-gray mb-4">
            {formatPrice(price)}
          </div>
          <div className="product-description mb-4 grow">
            <p>{description}</p>
          </div>
          <div className="product-cart-button">
            <AddToCart index={id} label="Add to cart" circle={false} />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (products.state) {
      case "hasData":
        const product = products.data.find((p) => p.id === parseInt(productId));
        return renderProduct(product);
      case "hasError":
        return <LoadingError message="Error loading products"  />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div>
      <h1 className="title-page">Product</h1>
      {renderContent()}
    </div>
  );
}
