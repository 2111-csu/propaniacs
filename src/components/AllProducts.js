import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getProducts } from "../axios-services";
import { callApi } from "../axios-services";


const AllProducts = ({token, id}) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);

      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });
      console.log(userCart, "Api call to get cart");
      setCart(userCart.data)
    };

    getAllProducts();
  }, [token]);

  const handleSubmit = async (event, productId, price, quantity, cart) => {
    event.preventDefault()
    console.log(cart, "cart going through handle submit");
    try {
      const addedToCart = await callApi({
        url: `/api/orders/${cart[0].orderId}/products`,
        token,
        method: "POST",
        data: {
          productId,
          price,
          quantity
        },  
      });

      setCart([addedToCart, ...cart])
      console.log(cart, "cart after Add");
      return cart
    } catch (error) {
      console.error(error)
    }
  }

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
                  <button type = "submit" onClick={(event) => handleSubmit(event, product.id, product.price, product.quantity, cart)}>Add To Cart</button>
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
