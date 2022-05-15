import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";

const AllOrders = ({token}) => {
  const history = useHistory();
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await callApi({
        url: `/api/orders`,
        token,
        method: "GET"
      });
      setOrders(allOrders.data);
    };

    getAllOrders();
  }, [token]);

  return (
    <>
      <div id="AllProductOrderContainer">
      {orders.map((order) => {
        return (
          <>
          {order.products.map((product) =>{
            return (
              <>
                <div id="orderContainer">
                    <p>Order Date Placed: {order.datePlaced}</p>
                    <p>Order Id: {order.orderId}</p>
                    <p>Quantity Ordered: {order.quantity}</p>
                    <p>Order Status: {order.status}</p>
                    <p>Product Name: {product.name}</p>
                    <p>Product Price (each): {product.price}</p>
                    <p>Product Category: {product.category}</p>
                    <button
                        class="adminButton"
                        type="submit"
                        onClick={() => history.push(`/orders/${order.orderId}`)}
                    >View Full Order</button>
                    <br></br>
                </div>
              </>
            )
          })}
        </>
        )
      })}
      </div>
    </>
  );
};

export default AllOrders;
