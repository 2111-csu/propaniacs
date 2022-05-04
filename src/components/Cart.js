import React, { useEffect, useState } from "react";
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
  }, [token]);

  return (
    <>
      <h1>Cart</h1>
      {cart.map((cartItem) => {
        return (
          <div key={cartItem.id}>
            <p>Date Placed: {cartItem.datePlaced}</p>
            <p>Price: {cartItem.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Status: {cartItem.status}</p>
            {cartItem.products.map((itemInCart) => {
              return (
                <div key={itemInCart.id}>
                  <p>Category: {itemInCart.category}</p>
                  <p>Item: {itemInCart.name}</p>
                  <p>Description: {itemInCart.description}</p>
                  <p>Image: {itemInCart.imageURL}</p>
                  <p>InStock: {itemInCart.true}</p>
                  <p>Item Price: {itemInCart.price}</p>
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
