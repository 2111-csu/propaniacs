import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const AllOrders = ({token}) => {
  const { productId } = useParams();
  const [orders, setOrders] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(Number)
  const [image, setImage] = useState("")

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await callApi({
        url: `/api/products/${productId}/orders`,
        token,
        method: "GET"
      });
      console.log(allOrders, "All Users");
      setOrders(allOrders.data);
      setName(allOrders.data[0].products[0].name)
      setCategory(allOrders.data[0].products[0].category)
      setDescription(allOrders.data[0].products[0].description)
      setPrice(allOrders.data[0].products[0].price)
      setImage(allOrders.data[0].products[0].imageURL)
    };

    getAllOrders();
  }, [token, productId]);

  return (
    <>
      <div id="productContainer">
        <div id="productContainerText">
          <p>Product Name:</p>
          <p>{name}</p>
        </div>
        <div id="productContainerText">
          <p>Product Category:</p>
          <p>{category}</p>
        </div>
        <div id="productContainerText">
          <p>Product Description:</p>
          <p>{description}</p>
        </div>
        <div id="productContainerText">
          <p>Price Per Unit:</p>
          <p>{price}</p>
        </div>
        <img
          id="ProductImg-Profile"
          src={image}
          alt=""
        />
      </div>
      <div id="productOrderContainer">
      {orders.map((order) => {
        return (
          <>
            <div id="orderContainer">
            <p>Order Date Placed: {order.datePlaced}</p>
            <p>Order Id: {order.orderId}</p>
            <p>Quantity Ordered: {order.quantity}</p>
            <p>Order Total: {order.price * order.quantity}</p>
            <p>Order Status: {order.status}</p>
            <br></br>
            </div>
        </>
        )
      })}
      </div>
    </>
  );
};

export default AllOrders;
