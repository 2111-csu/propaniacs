const express = require("express");
const cartRouter = express.Router();
const { getCartByUser } = require("../db/models/orders");

cartRouter.get("/", async (req, res, next) => {
  try {
    const userCart = await getCartByUser(1);
    console.log(userCart);
    res.send(userCart);
  } catch (error) {
    console.error(error);
  }
});

module.exports = cartRouter;
