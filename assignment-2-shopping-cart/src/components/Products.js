import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import ProductItem from "./ProductItem";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const renderProductItems = (products) => {
    return Object.keys(products).map((key) => (
      <ProductItem
        key={key}
        index={key}
        product={products[key]}
      />
    ));
  };

  return (
    <div className="container">
      <Header />
      <div>Hello world!</div>
      {loading ? "loading" : renderProductItems(products)}
    </div>
  );
}
