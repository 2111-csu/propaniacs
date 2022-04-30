const client = require("../client");

async function addProductToOrder({ productId, orderId, price, quantity }) {
  try {
    await client.query(
      `
    INSERT INTO order_products ( "productId", "orderId", price, quantity)
    VALUES($1, $2, $3, $4)
    RETURNING *;
      `,
      [productId, orderId, price, quantity]
    );

    const {
      rows: [orderProduct],
    } = await client.query(`
    UPDATE order_products
    SET price = ${price}, quantity = ${quantity}
    WHERE "orderId" = ${orderId} AND "productId" = ${productId}
    RETURNING *
    `);
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

async function getOrderProductById({ id }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      SELECT * FROM order_products
      WHERE id = $1
    `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

const updateOrderProduct = async ({ id, price, quantity }) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        UPDATE order_products
        SET price = $1, quantity = $2
        WHERE id = ${id}
        RETURNING *;
      `,
      [price, quantity]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
};

const destroyOrderProduct = async (id) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      DELETE FROM order_products
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    return orderProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProductToOrder,
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
};
