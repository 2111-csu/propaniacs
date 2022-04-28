import React, {useEffect, useState} from "react"
import {useHistory, Link} from "react-router-dom"
import { profileUser } from "../axios-services";
import SingleOrder from "./SingleOrder";

const Profile = ({token, username, firstName, lastName, email, }) => {

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                // const result = profileUser(username, password)
              } catch (error) {
                console.error(error)
              }
            }
            getUserProfile()
        }, [token])

    return (
        <>
          <h1>{firstName} {lastName}'s' Profile!</h1>
          <h3>Username: {username}</h3>
          <h3>Email: {email}</h3>
          <h3>
          <SingleOrder></SingleOrder>
          </h3>
          <br></br>
      </>
    )
}

export default Profile;