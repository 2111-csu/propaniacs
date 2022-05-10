import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const Profile = ({ token }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderDate, setOrderDate] = useState("")
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
        setOrderDate(completeOrders.data[0].datePlaced)
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
          <h1> Previous Orders </h1>
          <div id="orderbox">
            <div>
            <h3 id="orderDateBox">Date Ordered: {orderDate}</h3>
            </div>
            {orders.map((order) => {
              {
                checkoutTotal = checkoutTotal + order.price * order.quantity;
              }
              return (
                <>  
                  {order.status === "completed" ? (
                    <>
                      {order.products.map((item) => {
                        return (
                          <>
                          <div id="orderImgInfoBox">
                            <div id="orderImgBox">
                              <img
                                id="ProductImg-Profile"
                                src={item.imageURL}
                                alt=""
                              />
                            </div>
                            <div id="orderInfoBox">
                              <p>Product: {item.name}</p>
                              <p>Item Price (each): {order.price}</p>
                              <p>QTY Ordered: {order.quantity}</p>
                            </div>
                          </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <p> NO PREVIOUS ORDERS</p>
                  )}
                </>
              );
            })}
            <div id="orderTotalBox">
              <p>Order Total: ${checkoutTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
