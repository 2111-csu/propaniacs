const express = require("express");
const paymentRouter = express.Router();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51KwrdhDpvRAdcMotakkC1v5353UGpCoCIcFwU4Ez59ivdPZ8Ltlptd2I1qd2rDBHevdhsYtH5I6PP291vk5kQdha00k4XQVrzi"
);
const bodyParser = require("body-parser");
const cors = require("cors");
const { application } = require("express");

const { updateOrder, cancelOrder } = require("../db/models/orders");

paymentRouter.use(bodyParser.urlencoded({ extended: true }));
paymentRouter.use(bodyParser.json());

paymentRouter.use(cors());

// paymentRouter.listen(process.env.PORT )

paymentRouter.get("/secret", async (req, res, next) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Strick-Land Propane",
      payment_method: id,
      confirm: true,
    });

    // res.json({
    //   message: "Payment Success!",
    //   success: true,
    // });
  } catch (error) {
    console.error(error);
  }
});

paymentRouter.post("/", cors(), async (req, res, next) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Strick-Land Propane",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment Success!",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Payment Failed!",
      success: false,
    });
  }
});

paymentRouter.patch("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await updateOrder({
      id: orderId,
      status,
    });
    res.send({
      updatedOrder,
      message: `This order is ${status}`,
    });
  } catch (error) {
    throw error;
  }
});

paymentRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const canceledOrder = await cancelOrder(orderId);
    res.send({
      canceledOrder,
      message: `This order is ${status}`,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = paymentRouter;
