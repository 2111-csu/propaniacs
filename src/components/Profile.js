import React, { useEffect } from "react";
import { callApi } from "../axios-services";
import SingleOrder from "./SingleOrder";
import { useParams } from "react-router-dom";

const Profile = ({ token, username, firstName, lastName, email }) => {
  const { userId } = useParams();
  useEffect(() => {
    const getUsersOrders = async (id) => {
      const usersOrders = await callApi({
        url: `/users/1/orders`,
        token,
        method: "GET",
      });
      console.log("userOrders from Front end", usersOrders);
    };
    getUsersOrders(1);
  }, [token, userId]);

  return (
    <>
      <div id="profileBox">
        <div id="infoColumn">
          <h1>
            {firstName} {lastName}'s Profile!
          </h1>
          <h2>Username:</h2>
          <h3>{username}</h3>
          <h2>Email:</h2>
          <h3>{email}</h3>
        </div>
        <div id="orderRow">
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
