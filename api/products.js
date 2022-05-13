const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  destroyProduct,
  createProduct,
  updateProduct,
} = require("../db/models/products");

const { getOrderByProduct } = require("../db/models/orders");

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

productsRouter.post("/add", async (req, res, next) => {
  const { name, description, price, imageURL, inStock, category } = req.body;

  try {
    const newProduct = await createProduct({
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    });
    console.log(newProduct, "New Product during API");

    res.send(newProduct);
  } catch (error) {
    console.error(error);
  }
});

productsRouter.delete("/", async (req, res, next) => {
  const { productId } = req.body;

  try {
    const deletedProduct = await destroyProduct(productId);
    console.log(deletedProduct, "Product Delete during API");
    res.send(deletedProduct);
  } catch (error) {
    console.error(error);
  }
});

productsRouter.patch("/edit/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, imageURL, inStock, category } = req.body;

  try {
    const editedProduct = await updateProduct({
      id: productId,
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    });
    console.log(editedProduct, "Edit Product during Api");
    res.send(editedProduct);
  } catch (error) {
    console.error(error);
  }
});

productsRouter.get("/:productId/orders", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const ordersByProduct = await getOrderByProduct(productId);
    res.send(ordersByProduct);
  } catch (error) {
    console.error(error);
  }
});

module.exports = productsRouter;
