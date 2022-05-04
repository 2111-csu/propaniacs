import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "./style_assets/style.css";

import {
  SingleProduct,
  AllProducts,
  NavBar,
  Register,
  Login,
  SingleOrder,
  Profile,
  Cart,
  Home,
} from "./index";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const storedEmail = localStorage.getItem("email");
  const storedUsername = localStorage.getItem("username");
  const storedFirstName = localStorage.getItem("firstName");
  const storedLastName = localStorage.getItem("lastName");
  const storedId = localStorage.getItem("id");
  // const storedIsAdmin = localStorage.getItem("isAdmin")
  const storedToken = localStorage.getItem("token");
  console.log(localStorage, "localstorage from App");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  // const [isAdmin, setisAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("logged in status", loggedIn);

  useEffect(() => {
    if (storedToken) {
      setEmail(storedEmail);
      setUsername(storedUsername);
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setId(storedId);
      // setisAdmin(storedIsAdmin)
      setToken(storedToken);
    }
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, [
    storedToken,
    storedEmail,
    storedFirstName,
    storedLastName,
    storedId,
    storedUsername,
  ]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar token={token} setToken={setToken} loggedIn={loggedIn} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <AllProducts id={id} token={token} cart={cart} setCart={setCart} />
        </Route>
        <Route exact path={`/products/:productId`}>
          <SingleProduct />
        </Route>
        <Route exact path="/account/login">
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/account/register">
          <Register />
        </Route>
        <Route exact path="/account/me">
          <Profile
            token={token}
            username={username}
            email={email}
            firstName={firstName}
            lastName={lastName}
          />
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder id={id} />
        </Route>
        <Route exact path="/cart">
          <Cart id={id} token={token} cart={cart} setCart={setCart} />
        </Route>
      </BrowserRouter>
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
