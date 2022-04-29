const express = require("express");
const ordersRouter = express.Router();

const { requireUser } = require("./utils");
const {
  getAllOrders,
  getCartByUser,
  getOrderById,
} = require("../db/models/orders");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
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

ordersRouter.get("/cart", async (req, res, next) => {
  try {
    const { id } = req.user;

    const userCart = await getCartByUser(1);
    res.send(userCart);
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

module.exports = ordersRouter;
