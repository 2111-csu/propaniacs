const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  getCartByUser,
  getOrderById,
  updateOrder,
  cancelOrder,
  getOrderByUser
} = require("../db/models/orders");

const {addProductToOrder}= require ("../db/models/order_products")
const { requireUser } = require("./utils");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.user;

    const newOrder = await createOrder({
      status,
      id,
    });

    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cart", async (req, res, next) => {
  try {
    // const { id } = req.user;

    const userCart = await getCartByUser(1);
    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await getOrderById(orderId);
    console.log(order, "Order from ordersRouter.get");
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.post("/:orderId/products", requireUser, async (req, res, next) => {
  const { productId, price, quantity } = req.body;
  const {orderId} = req.params

  try {
    const orderProduct = await addProductToOrder({
        orderId, 
        productId, 
        price, 
        quantity});
    console.log(orderProduct, "SingleProduct from orders post");
    res.send(orderProduct);
  } catch (error) {
    console.log(error);
  }
});

ordersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const order = await getOrderByUser(userId);
    console.log(order, "Order from ordersRouter.get for profile");
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

module.exports = ordersRouter;
