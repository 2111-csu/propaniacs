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
      <h1 className="subjects">Single Product</h1>
        <div className="singleContainer">
          <div className="card__text">
            <div key={product.id}>
              <div id="singleTextContainer">
              <p className="single__subtitle">Product Name:{product.name}</p>
              <p className="single__subtitle">Product Description:{product.description}</p>
              <p className="single__subtitle">Product Price:{product.price}</p>
              <p className="single__subtitle">Product inStock:{product.inStock}</p>
              <p className="single__subtitle">Product Category:{product.category}</p>
            </div>
          </div>
        </div>
        <img id="singleimg" className ="products" src={product.imageURL} alt=""/>
      </div>
    </div>
  );
};

export default SingleProduct;
