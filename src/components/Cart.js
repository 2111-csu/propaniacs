import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../axios-services";

const Cart = ({ id, token, cart, firstName, setCart }) => {
  const [quantity, setQuantity] = useState(0);
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
  }, [setCart, token]);

  const reRenderCart = async () => {
      const userCart = await callApi({

      url: "/api/cart",
      token,
      method: "GET",
    });
    setCart(userCart.data);
  };

  const handleRemove = async (event, orderProductId) => {
    event.preventDefault();

    try {
      const removeFromCart = await callApi({
        url: `/api/order_products/${orderProductId}`,
        method: "DELETE",
        token,
      });
      setCart(cart);
      reRenderCart();
      return removeFromCart;
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = async (event, quantity, orderProductId) => {
    event.preventDefault();

    try {
      const editedCart = await callApi({
        url: `/api/order_products/${orderProductId}`,
        method: "PATCH",
        token,
        data: {
          quantity: Number(quantity),
        },
      });
      setCart(editedCart);
      reRenderCart();
      return cart;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div class="cartPageContainer">
        <div class="cartContainer">
          <h1>{firstName}'s Cart</h1>
          <div class="cartTitles">
            <p> Name | </p>
            <p> Quantity | </p>
            <p> Price (each) </p>
          </div>
          {cart.map((cartItem) => {
            return (
              <div key={cartItem.id}>
                {cartItem.products.map((itemInCart) => {
                  return (
                    <div key={itemInCart.id}>
                      <div class="innerCartContainer">
                        <div>
                        <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleRemove(event, itemInCart.id);
                        }}
                      >
                        <button id="remove" type="submit">Remove Item</button>
                      </form>
                      <div class ="cartEditContainer">
                        <input
                          type ="number"
                          id = "quantity"
                          placeholder="qty" 
                          min = "0" 
                          onChange = {(event) => setQuantity(event.target.value)}
                        />
                          <button 
                          id="edit" 
                          type="submit"
                          onClick={(event) =>
                          handleEdit(event, quantity, itemInCart.id)}
                          >Change Qty</button>
                        </div>
                      </div>
                        <img class ="cartImg" src={itemInCart.imageURL} alt=""/>
                        <div class ="cartTextOnly">
                          <p id ="singleCartText">{itemInCart.name}</p>
                          <p id ="singleCartText">{cartItem.quantity}</p>
                          <p id ="singleCartText">${itemInCart.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div class="totalContainer">
          <p id="total">Total Price: $</p>
          <Link to="/payment">
            <button class="checkoutButton">CheckOut</button>
          </Link>
          <Link to="/products">
            <button class="continueButton">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
