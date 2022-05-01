const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/models/users");
const { JWT_SECRET = "T4sT3mE@Tn0ThE@T" } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    console.log("Auth middleware token:", token);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log("JWT verify id:", id);

      if (id) {
        req.user = await getUserById(id);
        console.log("req.user created:", req.user);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

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
apiRouter.use("/order_products", require("../api/order_products"));
apiRouter.use("/cart", require("../api/cart"));

module.exports = apiRouter;
