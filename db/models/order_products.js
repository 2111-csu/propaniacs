const client = require("../client");

async function addProductToOrder({ productId, orderId, price, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
    INSERT INTO order_products ( "productId", "orderId", price, quantity)
    VALUES($1, $2, $3, $4)
    RETURNING *;
      `,
      [productId, orderId, price, quantity]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToOrder,
};
