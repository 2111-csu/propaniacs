const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
apiRouter.use("/products", require("../api/products"));
apiRouter.use("/account", require("../api/users"));
apiRouter.use("/orders", require("../api/orders"));

module.exports = apiRouter;
