import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { 
  SingleProduct, 
  AllProducts, 
  NavBar, 
  Register, 
  Login 
} from "./index";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const storedEmail = localStorage.getItem("email")
  const storedUsername = localStorage.getItem("username")
  const storedFirstName = localStorage.getItem("firstName")
  const storedLastName = localStorage.getItem("lastName")
  const storedId = localStorage.getItem("id")
  const storedIsAdmin = localStorage.getItem("isAdmin")
  const storedToken = localStorage.getItem("token")
  console.log(localStorage, "localstorage from App");  

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (storedToken){
      setToken(storedToken)
      setEmail(storedEmail)
      setUsername(storedUsername)
      setFirstName(storedFirstName)
      setLastName(storedLastName)
      setId(storedId)
      setisAdmin(storedIsAdmin)
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
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
      <BrowserRouter>
        <NavBar token = {token}/>
        <Route exact path="/products">
          <AllProducts />
        </Route>
        <Route exact path={`/products/:productId`}>
          <SingleProduct />
        </Route>
        <Route exact path="/account/login">
          <Login />
        </Route>
        <Route exact path="/account/register">
          <Register />
        </Route>
        {/* <Route exact path="/users/me">
          <Profile />
        </Route> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
