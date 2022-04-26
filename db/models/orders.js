const client = require("../client");

const createOrder = async ({ status, userId }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders (status, "userId")
        VALUES($1, $2) 
        RETURNING *;
        `,
      [status, userId]
    );

    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(`
      SELECT *
      FROM orders
      JOIN order_products ON orders.id="orderId"
    `);

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderByUser = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON orders.id="orderId"
      WHERE "userId"=$1
    `,
      [id]
    );

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON orders.id="orderId"
      WHERE "orderId"=$1
    `,
      [id]
    );

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderByProduct = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON orders.id="orderId"
      WHERE "productId"=$1
    `,
      [id]
    );

    return orders;
  } catch (error) {
    throw error;
  }
};

const getCartByUser = async (id) => {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT *
      FROM orders
      JOIN order_products ON orders.id="orderId"
      WHERE "userId"=$1
      AND status='created'
      
    `,
      [id]
    );

    return orders;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderByUser,
  getOrderById,
  getOrderByProduct,
  getCartByUser,
};
