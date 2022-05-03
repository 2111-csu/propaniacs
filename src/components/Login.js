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
        setPassword(result.password)
        setUsername(result.username)

        localStorage.setItem("email", result.user.email)
        localStorage.setItem("firstName", result.user.firstName)
        localStorage.setItem("id", result.user.id)
        localStorage.setItem("isAdmin", result.user.isAdmin)
        localStorage.setItem("lastName", result.user.lastName)
        localStorage.setItem("username", result.user.username)
        localStorage.setItem("token", result.token)

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
        <div class = "welcomeContainer"> 
          <h1 >Welcome!</h1>
          <h3 >
              Login to experience the joy of propane!
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
            <Link to = "/account/register">
            <h4>
              Already have an account? Login here!
            </h4>
          </Link>
          </form>
          </div>
      </>
    )
}

export default Login;