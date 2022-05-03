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
      <h1 className="subjects">AllProducts</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <div className="cards">
              <div className="card">
                <div className="card__text">
                  <Link to={`/products/${product.id}`}>
                    <div className="card__title" >Name: {product.name}</div>
                  </Link>
                  <img className ="products" src={product.imageURL} alt=""/>
                  <div className="card__subtitle"> Category: {product.category}</div>
                  <br></br>
                  <div className="card__subtitle"> Description: {product.description}</div>
                  <br></br>
                  <div className="card__subtitle"> Price: {product.price}</div>
                  <div className="card__subtitle"> inStock: {product.inStock}</div>
              </div>
            </div>
          </div>
          </div>
        );
      })}
    </>
  );
};

export default AllProducts;
