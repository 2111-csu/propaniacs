const express = require("express");
const paymentRouter = express.Router();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors");
const { application } = require("express");

paymentRouter.use(bodyParser.urlencoded({extended: true}))
paymentRouter.use(bodyParser.json);

paymentRouter.use(cors());

// paymentRouter.listen(process.env.PORT )

paymentRouter.get("/", async (req, res, next) => {
  try {
    
  } catch (error) {
    console.error(error);
  }
});

paymentRouter.post("/", cors(), async (req, res, next) => {
  let {amount, id} = req.body;
  try{
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Strick-Land Propane",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment);
    res.json({
      message: "Payment Success!",
      success: true
    })
  } catch (error) {
    console.log("error", error);
    res.json({
      message: "Payment Failed!",
      success: false
    })
    }
})

module.exports = paymentRouter;
