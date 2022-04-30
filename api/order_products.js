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

orderProductsRouter.delete("/:orderProductId", requireUser, async (req, res, next) => {
    const {orderProductId} = req.params

  try {
    const orderProduct = await getOrderProductById(orderProductId)
    const order = await getOrderById(orderProduct.orderId)
    const deletedOrder = await destroyOrderProduct(orderProduct);
    console.log(deletedOrder, "Order from ordersRouter.get");
    if(orderProduct && order.userId === req.user.id){
        res.send(deletedOrder);
    } else {
        next({
            name: 'Error',
            message: 'You cannot make this request'
        })
    }
  } catch (error) {
    throw(error);
  }
});

module.exports = orderProductsRouter;
