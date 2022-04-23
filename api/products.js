const express = require("express");
const productsRouter = express.Router();

const { getAllProducts, getProductById } = require("../db/models/products");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = productsRouter;
