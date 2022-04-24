import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    const getSingleProduct = async (id) => {
      const singleProduct = await getProductById(id);
      setProduct(singleProduct);
    };

    getSingleProduct(productId);
  }, [productId]);

  return (
    <div>
      <h1>Single Product</h1>
      <ul key={product.id}>
        <li>Product Name:{product.name}</li>
        <li>Product Description:{product.description}</li>
        <li>Product Price:{product.price}</li>
        <li>Product Image:{product.imageURL}</li>
        <li>Product inStock:{product.inStock}</li>
        <li>Product Category:{product.category}</li>
      </ul>
    </div>
  );
};

export default SingleProduct;
