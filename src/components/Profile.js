import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const Profile = ({ token }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  let checkoutTotal = 0;

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await callApi({
          url: `/api/account/${userId}`,
          method: "GET",
          token,
        });

        const completeOrders = await callApi({
          url: `/api/orders/${userId}`,
          method: "GET",
          token,
        });

        console.log(completeOrders);
        setUser(result.data);
        setOrders(completeOrders.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserProfile();
  }, [token, userId]);

  return (
    <>
      <div id="profileBox">
        <div id="infoColumn">
          <h1>
            {user.firstName} {user.lastName}'s Profile!
          </h1>
          <h2>Username:</h2>
          <h3>{user.username}</h3>
          <h2>Email:</h2>
          <h3>{user.email}</h3>
        </div>
        <div id="orderRow">
          <h3> Previous Orders </h3>
          {orders.map((order) => {
            {
              checkoutTotal = checkoutTotal + order.price * order.quantity;
            }
            return (
              <>
                {order.status === "completed" ? (
                  <>
                    <p>{order.datePlaced}</p>
                    <p>Order Total: ${checkoutTotal}</p>
                    {order.products.map((item) => {
                      return (
                        <>
                          <img
                            id="ProductImg-Profile"
                            src={item.imageURL}
                            alt=""
                          />
                          <p>Product: {item.name}</p>
                          <p>Item Price (each): {order.price}</p>
                          <p>QTY Ordered: {order.quantity}</p>
                        </>
                      );
                    })}
                    <br></br>
                  </>
                ) : (
                  <p> NO PREVIOUS ORDERS</p>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
