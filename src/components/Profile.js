import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const Profile = ({ token }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({})

  useEffect(() => {

    const getUserProfile = async () => {
        try {
            const result = await callApi({
              url: `/api/account/${userId}`,
              method: "GET",
              token
            })

            setUser(result.data)
          } catch (error) {
            console.error(error)
          }
        }
        getUserProfile()
  }, [token, userId]);

  return (
    <>
    <div id = "profileBox">
      <div id = "infoColumn">
        <h1>
          {user.firstName} {user.lastName}'s Profile!
        </h1>
        <h2>Username:</h2>
        <h3>{user.username}</h3>
        <h2>Email:</h2>
        <h3>{user.email}</h3>
      </div>
      <div id = "orderRow">
        <h3>
          Previous Orders
        </h3>
        <br></br>
        </div>
      </div>
    </>
  );
};

export default Profile;
