import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "../axios-services";
import SnackBar from "./SnackBar";

const Login = ({ setLoggedIn }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginUser(username, password);

      setPassword(result.password);
      setUsername(result.username);

      localStorage.setItem("email", result.user.email);
      localStorage.setItem("firstName", result.user.firstName);
      localStorage.setItem("id", result.user.id);
      localStorage.setItem("isAdmin", result.user.isAdmin);
      localStorage.setItem("lastName", result.user.lastName);
      localStorage.setItem("username", result.user.username);
      localStorage.setItem("token", result.token);

      if (result.token) {
        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
        setMessage(result.message)
        SnackBar()
        history.push("/products");
      } else {
        setMessage(result.message)
        SnackBar()
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div class="welcomeContainer">
        <h1>Welcome!</h1>
        <h3>Login to experience the joy of propane!</h3>
        <div id="snackbar">{message}</div>
        <form class="input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <button type="submit">SUBMIT</button>
          <Link to="/account/register">
            <h4>Already have an account? Login here!</h4>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
