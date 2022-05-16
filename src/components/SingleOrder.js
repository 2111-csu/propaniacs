import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getOrderById } from "../axios-services";
import { callApi } from "../axios-services";

const SingleOrder = ({token}) => {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const history = useHistory();
  const { orderId } = useParams();

  useEffect(() => {
    const getSingleOrder = async (orderId) => {
      const singleOrder = await getOrderById(orderId);
      console.log(singleOrder, "Single Order response");
      setOrder(singleOrder);
      setDate(singleOrder[0].datePlaced)
      setCurrentStatus(singleOrder[0].status)
    };
    getSingleOrder(orderId);
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const editedOrder = await callApi({
        url: `/api/orders/${orderId}`,
        method: "PATCH",
        token,
        data: {
          status
        },
      });
      console.log(editedOrder, "Edited Order Response");
      history.push("/orders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="singleOrderContainer">
      <div id="singleOrderTitle">
        <p>Order Status: {currentStatus}</p>
        <p>Order Date: {date}</p>
      </div>
      <div id="singleOrderProdContainer">
      {order.map((orderDetails) => {
        return (
          <>
            {orderDetails.products.map((product) => {
              return (
                <div id="singleOrderSingleProdContainer">
                    <p> Name: {product.name}</p>
                    <p>Product Category: {product.category}</p>
                    <p>Product Price: {product.price}</p>
                    {product.inStock === true
                      ? <p>Product In Stock: YES</p>
                      : <p>Product In Stock: NO</p>
                    }
                    <br></br>
                </div>
              );
            })}
          </>
        );
      })}
      </div>
      <form class="input" onSubmit={handleSubmit}>
        <div id="singleOrderChangeContainer">
        <label id="changeStatus">Change Status: </label>
          <input
            id="editInput"
            type="text"
            placeholder="created/cancelled/completed"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></input>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default SingleOrder;
