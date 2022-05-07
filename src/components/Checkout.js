import React, { useState } from "react";
import { callApi } from "../axios-services";
import companyLogo from "../style/CompanyLogo.png"

const Checkout = ({ token, email, cart }) => {
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [verifiedEmail, setVerifiedEmail] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        //   setToken(result.token)
        //   setPassword(result.password)
        //   setUsername(result.username)
        //   setFirstName(result.firstName, "First Name Set")
        //   setLastName(result.lastName, "Last Name Set")
        //   setEmail(result.email, "Email Set")
        //   setisAdmin(result.isAdmin, "isAdmin Set")
  
        //   localStorage.setItem("email", result.user.email)
        //   localStorage.setItem("firstName", result.user.firstName)
        //   localStorage.setItem("id", result.user.id)
        //   localStorage.setItem("isAdmin", result.user.isAdmin)
        //   localStorage.setItem("lastName", result.user.lastName)
        //   localStorage.setItem("username", result.user.username)

        } catch (error) {
          console.error(error)
        }
    }


  const handleCompleteOrder = async (event, orderId) => {
    event.preventDefault();
    try{
        const completeOrder = callApi({
            url: `api/orders/${orderId}`,
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
        const cancelOrder = callApi({
            url: `api/orders/${orderId}`,
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
            <div class="CheckoutUserInfo">
                <form class ="input" onSubmit={handleSubmit} >
                    <input 
                    type = "email" 
                    placeholder = "Confirm Email Address" 
                    value = {verifiedEmail}
                    onChange={(e) => setVerifiedEmail(e.target.value)}>
                    </input>
                    <br></br>
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
                    <button
                    type = "submit">
                    SUBMIT
                    </button>
                </form>
            </div>
            <img className="companyLogo" src = {companyLogo} alt="Strick-Land Propane Logo"/>
            <div class="paymentBox">
                <button 
                id="CancelOrder"
                onClick={(event) =>
                handleCancelOrder(event, cart.id)}
                >Cancel Order</button>
                <button 
                id="CompleteOrder"
                onClick={(event) =>
                handleCompleteOrder(event, cart.id)}
                >Complete Order</button>
            </div>
        </div>
        </>
    );
};

export default Checkout;
