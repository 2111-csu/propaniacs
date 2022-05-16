const express = require("express");
const orderProductsRouter = express.Router();

const {
  destroyOrderProduct,
  updateOrderProduct,
} = require("../db/models/order_products");

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;
  const { quantity } = req.body;
  const { id } = req.user;

  try {
    const updatedOrderProduct = await updateOrderProduct({
      id: orderProductId,
      quantity,
    });
    res.send(updatedOrderProduct);
  } catch (error) {
    throw error;
  }
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;

  try {
    const deletedOrderProduct = await destroyOrderProduct(
      Number(orderProductId)
    );
    res.send(deletedOrderProduct);
  } catch (error) {
    throw error;
  }
});

module.exports = orderProductsRouter;
