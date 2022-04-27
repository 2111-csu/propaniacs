import React, {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import { loginUser } from "../axios-services";

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const result = await loginUser(username, password)
        console.log(result, "Result during login");

        setPassword(result.password, "Password Set")
        setUsername(result.username, "Username Set")
        console.log(username, "username from Login");
        console.log(password, "password from Login");
        localStorage.setItem("email", result.user.email)
        localStorage.setItem("firstName", result.user.firstName)
        localStorage.setItem("id", result.user.id)
        localStorage.setItem("isAdmin", result.user.isAdmin)
        localStorage.setItem("lastName", result.user.lastName)
        localStorage.setItem("username", result.user.username)
        console.log(localStorage);  
      if (result.token){
          history.push("/products")
        }  
      } catch (error) {
        console.error(error)
      }
  }

    return (
        <>
          <h1 class="welcome">Welcome!</h1>
          <br></br>
          <h3 class = "welcome">
              Login to experience the joy of Propane!
          </h3>
          <form class ="input" onSubmit={handleSubmit}>
            <input 
              type = "text" 
              placeholder = "username" 
              value = {username}
              // value = "KingOfTheHill"
              onChange={(e) => setUsername(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "password" 
              placeholder = "password" 
              value = {password}
              // value = "propaneIsBeautiful"
              onChange={(e) => setPassword(e.target.value)}>
            </input>
            <br></br>
            <button 
              type = "submit">
              SUBMIT
            </button>
          </form>
          <br></br>
          <Link to = "/account/register">
            <h4>
              Already have an account? Login here!
            </h4>
          </Link>
          <br></br>
      </>
    )
}

export default Login;