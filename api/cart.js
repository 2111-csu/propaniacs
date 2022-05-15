const express = require("express");
const cartRouter = express.Router();
const { getCartByUser } = require("../db/models/orders");

cartRouter.get("/", async (req, res, next) => {
  // const { id } = req.user;

  try {
    const userCart = await getCartByUser(1);
    res.send(userCart);
  } catch (error) {
    console.error(error);
  }
});

module.exports = cartRouter;
