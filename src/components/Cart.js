import React, { useEffect } from "react";
import { callApi } from "../axios-services";

const Cart = ({ id, token, cart, setCart }) => {
  

  useEffect(() => {
    const getCart = async () => {
      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });
      setCart(userCart.data);
    };
    getCart();
  }, [token, setCart]);

  const handleRemove = async (event, orderProductId) => {
    event.preventDefault();

    try {
      const removeFromCart = await callApi({
        url: `/api/order_products/${orderProductId}`,
        method: "DELETE",
        token,
      });
      setCart(removeFromCart, ...cart);
      return cart;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1>Cart</h1>
      {cart.map((cartItem) => {
        return (
          <div key={cartItem.id}>
            <p>Date Placed: {cartItem.datePlaced}</p>
            <p>Price: {cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            {cartItem.products.map((itemInCart) => {
              return (
                <div key={itemInCart.id}>
                  <p>Item: {itemInCart.name}</p>
                  <p>Description: {itemInCart.description}</p>
                  <p>Category: {itemInCart.category}</p>
                  <p>InStock: {itemInCart.true}</p>
                  <p>Item Price: {itemInCart.price}</p>
                  <button 
                    type="submit"
                    onClick={(event) => handleRemove(event, itemInCart.id)}
                >Remove Item
                </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Cart;
