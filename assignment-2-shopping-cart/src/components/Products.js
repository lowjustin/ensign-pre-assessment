import React, { useState, useEffect } from "react";
import axios from "axios";

import LoadingSpinner from "./LoadingSpinner";
import ProductItem from "./ProductItem";

export default function Products(props) {
  const { products, loading } = props;
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://fakestoreapi.com/products?limit=10`
  //       );
  //       setProducts(response.data);
  //       setError(null);
  //     } catch (err) {
  //       setError(err.message);
  //       setProducts(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  const renderProductItems = (products) => {
    return (
      <ul className="products-list">
        {Object.keys(products).map((key) => (
          <ProductItem key={key} index={key} product={products[key]} />
        ))}
      </ul>
    );
  };

  return (
    <div className="products">
      <h2>Products</h2>
      {/* show loader if products not loaded, else render product items */}
      {loading ? <LoadingSpinner /> : renderProductItems(products)}
    </div>
  );
}
