import React, { useEffect, useState } from "react";
import { getCartByUser } from "../axios-services";

const Cart = ({ id }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const getUserCart = async (id) => {
      const userCart = await getCartByUser(id);
      console.log("cart from react component", userCart);
      setCart(userCart)
    };
    getUserCart(id);
  }, [id]);

  return (
    <>
     <h1>Cart</h1>
     {cart.map((cartItem) => {
       return(
         <>
         <p>Date Placed: {cartItem.datePlaced}</p>
         <p>Price: {cartItem.price}</p>
         <p>Quantity: {cartItem.quantity}</p>
         <p>Status: {cartItem.status}</p>
         {cartItem.products.map((itemInCart) => {
           return(
             <>
             <p>Category: {itemInCart.category}</p>
             <p>Item: {itemInCart.name}</p>
             <p>Description: {itemInCart.description}</p>
             <p>Image: {itemInCart.imageURL}</p>
             <p>InStock: {itemInCart.true}</p>
             <p>Item Price: {itemInCart.price}</p>
             </>
           )
         })}
         </>
       )
     })}
    </>
  )
};

export default Cart;
