const express = require("express");
const orderProductsRouter = express.Router();

const {
  destroyOrderProduct, 
  updateOrderProduct,
  getOrderProductById
}= require ("../db/models/order_products");

const { getOrderById } = require("../db/models/orders");
const { requireUser } = require("./utils");

orderProductsRouter.patch("/:orderProductId", requireUser, async (req, res, next) => {
  const {price, quantity } = req.body;
  const {orderProductId} = req.params
  const {id} = req.user

  try {
    const orderProduct = await getOrderProductById(orderProductId)
    const order = await getOrderById(orderProduct.orderId)
    const updatedOrderProduct = await updateOrderProduct({
        id: orderProductId,
        price,
        quantity
     })
     console.log(updatedOrderProduct, "patch order from orderProductsRouter");

     if (id !== order.userId){
        next({
            name: 'UpdateError',
            message: "You are not able to make this action",
          });
        } else {
        res.send(updatedOrderProduct)
     }
  } catch (error) {
    throw(error);
  }
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
    const {orderProductId} = req.params

  try {
    const deletedOrderProduct = await destroyOrderProduct(orderProductId);
    console.log(deletedOrderProduct, "Delete from ordersRouter.delete");
    res.send(deletedOrderProduct);
  } catch (error) {
    throw(error);
  }
});

module.exports = orderProductsRouter;
