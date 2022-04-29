import React, { useEffect } from "react";
import { getCartByUser } from "../axios-services";

const Cart = ({ id }) => {
  useEffect(() => {
    const getUserCart = async () => {
      const userCart = await getCartByUser(id);
      console.log("cart from react component", userCart);
    };
    getUserCart();
  });
  return <h1>Cart</h1>;
};

export default Cart;
