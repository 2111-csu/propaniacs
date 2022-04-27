import React, {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import { createUser } from "../axios-services";

const Register = () => {
    const history = useHistory()
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
        console.log(result, "Result during login");

        setPassword(result.password, "Password Set")
        setUsername(result.username, "Username Set")
        setFirstName(result.firstName, "First Name Set")
        setLastName(result.lastName, "Last Name Set")
        setEmail(result.email, "Email Set")
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
              Register to experience the joy of Propane!
          </h3>
          <form class ="input" onSubmit={handleSubmit} >
          <br></br>
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
              // value = "KingOfTheHill"
              onChange={(e) => setEmail(e.target.value)}>
            </input>
            <br></br>
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
              placeholder = "Password" 
              value = {password}
              // value = "propaneIsBeautiful"
              onChange={(e) => setPassword(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "checkbox" 
              placeholder = "Admin?" 
              value = {isAdmin}
              onChange={(e) => setisAdmin(true)}>
            </input>
            <br></br>
            <button 
              type = "submit">
              SUBMIT
            </button>
          </form>
          <br></br>
          <Link to = "/users/login">
            <h4>
              Already have an account? Login here!
            </h4>
          </Link>
          <br></br>
      </>
    )
}

export default Register;