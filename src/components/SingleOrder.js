import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../axios-services";

const SingleOrder = () => {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const { orderId } = useParams();

  useEffect(() => {
    const getSingleOrder = async (orderId) => {
      const singleOrder = await getOrderById(orderId);

      setOrder(singleOrder);
    };

    getSingleOrder(orderId);
  }, [orderId]);

  return (
    <div>
      <h1>Single Order</h1>
      <p>Order Status: {status}</p>
      <p>Order Date:{date}</p>
      {order.map((orderItem) => {
        if (!date) {
          setDate(orderItem.datePlaced);
        }

        if (!status) {
          setStatus(orderItem.status);
        }
        return (
          <>
            {orderItem.products.map((item) => {
              return (
                <>
                  <ul>
                    <li>Product Name: {item.name}</li>
                  </ul>
                </>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default SingleOrder;
