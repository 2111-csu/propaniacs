import React, { useEffect } from "react";
// import { profileUser } from "../axios-services";
import SingleOrder from "./SingleOrder";

const Profile = ({ token, username, firstName, lastName, email }) => {
  useEffect(() => {
    // const getUserProfile = async () => {
    //     try {
    //         const result = await profileUser()
    //         console.log(result, "result from getUserProfile");
    //         setUser(result)
    //       } catch (error) {
    //         console.error(error)
    //       }
    //     }
    //     getUserProfile(user)
  }, []);

  return (
    <>
    <div id = "profileBox">
      <div id = "infoColumn">
        <h1>
          {firstName} {lastName}'s Profile!
        </h1>
        <h2>Username:</h2>
        <h3>{username}</h3>
        <h2>Email:</h2>
        <h3>{email}</h3>
      </div>
      <div id = "orderRow">
        <h3>
          <SingleOrder></SingleOrder>
        </h3>
        <br></br>
        </div>
      </div>
    </>
  );
};

export default Profile;
