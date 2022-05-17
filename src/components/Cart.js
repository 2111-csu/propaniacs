import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../axios-services";

const Cart = ({ token }) => {
  const orderId = localStorage.getItem("orderId");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  let cartTotal = 0;

  useEffect(() => {
    const getCart = async () => {
      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });

      setCart(userCart.data);
      localStorage.setItem("orderId", userCart.data[0].orderId);
    };
    getCart();
  }, [token]);

  const handleRemove = async (event, orderProductId) => {
    event.preventDefault();

    try {
       await callApi({
        url: `/api/order_products/${orderProductId}`,
        method: "DELETE",
        cart,
        token,
      });

      const getCart = async () => {
        const userCart = await callApi({
          url: "/api/cart",
          token,
          method: "GET",
        });

        setCart(userCart.data);
      };
      getCart();

      // setCart(remainingProducts);
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
      const product = cart.find((product) => product.id === orderProductId);
      const remainingProducts = cart.filter(
        (product) => product.id !== orderProductId
      );
      const updatedProduct = { ...product, ...editedCart.data };

      setCart([...remainingProducts, updatedProduct]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="cartPageContainer">
        <div className="cartContainer">
          <h1>Cart</h1>
          <div className="cartTitles">
            <p> Name | </p>
            <p> Quantity | </p>
            <p> Price (each) </p>
          </div>
          {cart.map((cartItem) => {
            cartTotal = (cartTotal + cartItem.price * cartItem.quantity);
            return (
              <div key={cartItem.id}>
                {cartItem.products.map((itemInCart) => {
                  return (
                    <div key={itemInCart.id}>
                      <div className="innerCartContainer">
                        <div>
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              handleRemove(event, itemInCart.id);
                            }}
                          >
                            <button id="remove" type="submit">
                              Remove Item
                            </button>
                          </form>
                          <div className="cartEditContainer">
                            <input
                              type="number"
                              id="quantity"
                              placeholder="qty"
                              min="0"
                              onChange={(event) =>
                                setQuantity(event.target.value)
                              }
                            />
                            <button
                              id="edit"
                              type="submit"
                              onClick={(event) =>
                                handleEdit(event, quantity, itemInCart.id)
                              }
                            >
                              Change Qty
                            </button>
                          </div>
                        </div>
                        <img
                          className="cartImg"
                          src={itemInCart.imageURL}
                          alt=""
                        />
                        <div className="cartTextOnly">
                          <p id="singleCartText">{itemInCart.name}</p>
                          <p id="singleCartText">{cartItem.quantity}</p>
                          <p id="singleCartText">${itemInCart.price}</p>
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
          <p id="total">Total Price: ${cartTotal.toFixed(2)}</p>
          <Link to={`/payment/${orderId}`}>
            <button className="checkoutButton">CheckOut</button>
          </Link>
          <Link to="/products">
            <button className="continueButton">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
