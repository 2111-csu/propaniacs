import React, { useState, useEffect } from "react";
import { callApi } from "../axios-services";
import { useParams } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51KwrdhDpvRAdcMotWgYznOcLGPqH3hxmCWkyOmHfyDXCRLNMarMbSbL051E8d7gSzpaQSCHG1Dnj4DbwbPyj8beu00ZvRFH4Sx"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const Checkout = ({ token }) => {
    const { orderId } = useParams();
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [cart, setCart] = useState([])
    let cartTotal = 0;


    useEffect(() => {
        const getCart = async () => {
        const cart = await callApi({
            url: "/api/cart",
            token,
            method: "GET",
        });
        
        setCart(cart.data);
        };
        getCart();
    }, [setCart, token]);
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        //   setToken(result.token)
        //   setPassword(result.password)
        //   setUsername(result.username)
  
        //   localStorage.setItem("isAdmin", result.user.isAdmin)
        //   localStorage.setItem("lastName", result.user.lastName)
        //   localStorage.setItem("firstName", result.user.firstName)

        } catch (error) {
          console.error(error)
        }
    }

  const handleCompleteOrder = async (event, orderId) => {
    event.preventDefault();
    try{
        const completeOrder = await callApi({
            url: `/api/payment/${orderId}`,
            method: "PATCH",
            token,
            data: {
                status: "completed"
            }
        })
        console.log(completeOrder, "clicked = Complete Order");
    } catch(error) {
        throw error
    }
  };

  const handleCancelOrder = async (event, orderId) => {
    event.preventDefault();
    try{
        const cancelOrder = await callApi({
            url: `/api/payment/${orderId}`,
            method: "DELETE",
            token,
            data: {
                status: "cancelled"
            }
        })
        console.log(cancelOrder, "clicked = Cancel Order");
    } catch(error) {
        throw error
    }
  };

    return (
        <>
       <div id="CheckoutContainer">
            <div id="checkoutCartBox">
            {cart.map((cartItem) => {
                cartTotal = cartTotal + cartItem.price * cartItem.quantity;
            
                return (
                    <div key={cartItem.id}>
                        {cartItem.products.map((itemInCart) => {
                            return (
                                <div key={itemInCart.id}>
                                <div class="innerCheckoutCartContainer">
                                    <img class="checkoutProdImg" src={itemInCart.imageURL} alt="" />
                                    <div class="checkoutProdTextOnly">
                                    <p id="singleCheckoutText">{itemInCart.name}</p>
                                    <p id="singleCheckoutText">Qty: {cartItem.quantity}</p>
                                    <p id="singleCheckoutText">${itemInCart.price} (each)</p>
                                    </div>
                                </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div id="checkoutPrice">
                <p id="total">Total Price: ${cartTotal}</p>
            </div>
        </div>
            <div class="boxPayShip">
                <div class="CheckoutUserInfo">
                    <div id="checkoutInfo">Shipping Address:</div>
                        <form class ="input" onSubmit={handleSubmit} >
                            <input 
                                type = "text" 
                                placeholder = "Address" 
                                value = {address}
                                onChange={(e) => setAddress(e.target.value)}>
                            </input>
                            <br></br>
                            <input 
                                type = "text" 
                                placeholder = "City" 
                                value = {city}
                                onChange={(e) => setCity(e.target.value)}>
                            </input>
                            <br></br>
                            <input 
                                type = "text" 
                                placeholder = "State" 
                                value = {state}
                                onChange={(e) => setState(e.target.value)}>
                            </input>
                            <br></br>
                            <input 
                                type = "text" 
                                maxlength="5"
                                placeholder = "Zip Code" 
                                value = {zip}
                                onChange={(e) => setZip(e.target.value)}>
                            </input>
                            <br></br>
                            <div id="shipSubmit">
                                <button
                                type = "submit">
                                SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
            <div class="paymentBox">
                <div id="checkoutInfo">Credit Card Info:</div>
                <Elements stripe = {stripeTestPromise}>
                    <PaymentForm orderId = {orderId} token ={token} />
                </Elements>
                <button 
                    id="CompleteOrder"
                    onClick={(event) =>
                    handleCompleteOrder(event, orderId)}
                >Complete Order</button>
                <button 
                    id="CancelOrder"
                    onClick={(event) =>
                    handleCancelOrder(event, orderId)}
                >Cancel Order</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Checkout;
