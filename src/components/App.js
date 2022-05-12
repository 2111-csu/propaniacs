import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "./style_assets/style.css";
import "./style_assets/snackbar.css";

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
  Checkout,
  Admin,
  AllUsers,
  AddUser,
  SingleUser,
  AllOrders,
  AddProduct,
  EditProduct,
} from "./index";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const storedEmail = localStorage.getItem("email");
  const storedId = localStorage.getItem("id");
  const storedIsAdmin = localStorage.getItem("isAdmin")
  const storedToken = localStorage.getItem("token");
  const storedLoggedIn = localStorage.getItem("loggedIn");
  console.log(localStorage, "localstorage from App");

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("logged in status", loggedIn);

  useEffect(() => {
    if (storedToken) {
      setEmail(storedEmail);
      setId(storedId);
      setisAdmin(storedIsAdmin)
      setToken(storedToken);
      setLoggedIn(storedLoggedIn);
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
  }, [storedToken, storedIsAdmin, storedEmail, storedId, storedLoggedIn]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar
          token={token}
          id={id}
          setToken={setToken}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
        <Route exact path="/">
          <Home />
        </Route>
        <Switch>
          <Route exact path="/products">
            <AllProducts id={id} token={token} isAdmin = {isAdmin} cart={cart} setCart={setCart} />
          </Route>
          <Route path="/products/add">
            <AddProduct token = {token} />
          </Route>
          <Route path="/products/edit">
            <EditProduct />
          </Route>
          <Route path="/products/:productId">
            <SingleProduct
              id={id}
              token={token}
              cart={cart}
              setCart={setCart}
            />
          </Route>
        </Switch>
        <Route exact path="/account/login">
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/account/register">
          <Register setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/account/me/:userId">
          <Profile token={token} />
        </Route>
        <Route exact path="/orders">
          <AllOrders />
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder id={id} />
        </Route>
        <Route exact path="/cart">
          <Cart token={token} cart={cart} setCart={setCart} />
        </Route>
        <Route path="/payment/:orderId">
          <Checkout token={token} />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Switch>
          <Route exact path="/users">
            <AllUsers />
          </Route>
          <Route path="/users/add">
            <AddUser />
          </Route>
          <Route path="/users/:userId">
            <SingleUser />
          </Route>
        </Switch>
      </BrowserRouter>

      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
