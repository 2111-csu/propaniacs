import React, {useState} from "react"
import {useHistory, Link} from "react-router-dom"
import { createUser } from "../axios-services";


const Register = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user = await createUser()
        console.log(user, "User getting registered");

        localStorage.setItem("username", user.username)
        localStorage.setItem("password", user.password)

    console.log(localStorage);
    // getGuest(result.token);
    // if (result.token){
    //   history.push("/activities")
    // } 
    // deliverMsg(result)
      } catch (error) {
        console.error(error)
      }
  }

//   const deliverMsg = (result) => {
//     if (result){
//       alert(result.message)
//     } else {
//       alert(result.error.message)
//     }
//   }

    // const getGuest = async (token) => {
    //   try {
    //     const resp = await fetch(`${BASE_URL}/users/me`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     const result = await resp.json();
    //     localStorage.setItem("username", result.username)
    //     setGuest(result.username)
    //   } catch (error) {
    //     console.error(error, "error from register");
    //   }
    // }

    return (
        <>
          <h1 class="welcome">Welcome!</h1>
          <br></br>
          <h3 class = "welcome">
              Register to create activities, routines, and more!
          </h3>
          <form class ="input" onSubmit={handleSubmit}>
            <input 
              type = "text" 
              placeholder = "username" 
              value = {username}
              onChange={(e) => setUsername(e.target.value)}>
            </input>
            <br></br>
            <input 
              type = "password" 
              placeholder = "password" 
              value = {password}
              onChange={(e) => setPassword(e.target.value)}>
            </input>
            <br></br>
            <button 
              type = "submit">
              SUBMIT
            </button>
          </form>
          <br></br>
          <Link to = "/users/login">
            <h4 id = "register">
              Already have an account? Login here!
            </h4>
          </Link>
          <br></br>
      </>
    )
}

export default Register;