import React, {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import { createUser } from "../axios-services";
import SnackBar from "./SnackBar";

const Register = ({setToken, setLoggedIn}) => {
    const history = useHistory()
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setisAdmin] = useState(false)

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const result = await createUser(username, password, firstName, lastName, email, isAdmin)

        setPassword(result.password)
        setUsername(result.username)
        setFirstName(result.firstName)
        setLastName(result.lastName)
        setEmail(result.email)
        setisAdmin(result.isAdmin)

        localStorage.setItem("firstName", result.user.firstName)
        localStorage.setItem("lastName", result.user.lastName)
        localStorage.setItem("username", result.user.username)
        localStorage.setItem("email", result.user.email)
        localStorage.setItem("id", result.user.id)
        localStorage.setItem("isAdmin", result.user.isAdmin)

        if (result.token){
          localStorage.setItem("loggedIn", true);
          setLoggedIn(true)
          history.push("/products")
          setMessage(result.message)
          SnackBar()
        } else {
          setMessage(result.message)
          SnackBar()
        }
      } catch (error) {
        console.error(error)
      }
  }

    return (
      <>
      <div class = "welcomeContainer"> 
        <h1>Welcome!</h1>
        <h3>Register to experience the joy of Propane!</h3>
        <div id="snackbar">{message}</div>
        <form class ="input" onSubmit={handleSubmit} >
            <input 
              type = "text" 
              placeholder = "First Name" 
              value = {firstName}
              onChange={(e) => setFirstName(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "text" 
              placeholder = "Last Name" 
              value = {lastName}
              onChange={(e) => setLastName(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "email" 
              placeholder = "Email" 
              value = {email}
              onChange={(e) => setEmail(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "text" 
              placeholder = "username" 
              value = {username}
              onChange={(e) => setUsername(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "password" 
              placeholder = "Password" 
              value = {password}
              onChange={(e) => setPassword(e.target.value)}>
            </input>
            <br></br>
            <button 
              type = "submit">
              SUBMIT
            </button>
            <Link to = "/account/login">
              <h4>Already have an account? Login here!</h4>
            </Link>
        </form>
        </div>
    </>
    )
}

export default Register;