import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../axios-services";

const SingleOrder = () => {
  const [order, setOrder] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    const getSingleOrder = async (orderId) => {
      const singleOrder = await getOrderById(orderId);
      console.log("singleOrder", singleOrder);

      setOrder(singleOrder);
    };

    getSingleOrder(orderId);
  }, [orderId]);

  return (
    <div>
      <h1>Single Order</h1>
      {
    order.map((orderItem) => {
      return(
        <>
      <ul key={order.id}>
        <li>Order Status:{orderItem.status}</li>
        <li>Order Date:{orderItem.datePlaced}</li>
      </ul>
        {
          orderItem.products.map((item) => {
            return(
              <>
                <ul>
                <li>Product Name: {item.name}</li>
                </ul>
              </>
            )
          })
        }
        </>
      )
      })}
      </div>
  );
};

export default SingleOrder;
