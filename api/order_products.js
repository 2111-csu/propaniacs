const express = require("express");
const orderProductsRouter = express.Router();

const {
  destroyOrderProduct,
  updateOrderProduct,
  getOrderProductById,
} = require("../db/models/order_products");

const { getOrderById } = require("../db/models/orders");
const { requireUser } = require("./utils");

orderProductsRouter.patch("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;
  const { quantity } = req.body;
  const { id } = req.user;

  try {
    // const orderProduct = await getOrderProductById(orderProductId)
    // console.log(orderProduct, "orderProduct from patch");
    // const order = await getOrderById(orderProduct.orderId)
    // console.log(order, "order from patch cart");
    const updatedOrderProduct = await updateOrderProduct({
      id: orderProductId,
      quantity,
    });
    console.log(updatedOrderProduct, "patch order from orderProductsRouter");

    //  if (id !== order.userId){
    //     next({
    //         name: 'UpdateError',
    //         message: "You are not able to make this action",
    //       });
    //     } else {
    //     res.send(updatedOrderProduct)
    //  }
    res.send(updatedOrderProduct);
  } catch (error) {
    throw error;
  }
});

orderProductsRouter.delete("/:orderProductId", async (req, res, next) => {
  const { orderProductId } = req.params;
  console.log("req.params", orderProductId);

  try {
    const deletedOrderProduct = await destroyOrderProduct(
      Number(orderProductId)
    );
    console.log(deletedOrderProduct, "Delete from ordersRouter.delete");
    res.send(deletedOrderProduct);
  } catch (error) {
    throw error;
  }
});

module.exports = orderProductsRouter;
