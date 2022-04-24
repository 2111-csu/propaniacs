import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../axios-services";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };

    getAllProducts();
  }, []);

  return (
    <>
      <h1>AllProducts</h1>
      {products.map((product) => {
        return (
          <ul key={product.id}>
            <Link to={`/products/${product.id}`}>
              <li>Product Name:{product.name}</li>
            </Link>
            <li>Product Description:{product.description}</li>
            <li>Product Price:{product.price}</li>
            <li>Product Image:{product.imageURL}</li>
            <li>Product inStock:{product.inStock}</li>
            <li>Product Category:{product.category}</li>
          </ul>
        );
      })}
    </>
  );
};

export default AllProducts;
