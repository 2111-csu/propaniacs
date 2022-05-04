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

    const { rows: allProducts } = await client.query(`
      SELECT *
      FROM products
      
    `);

    orders.forEach((order) => {
      order.products = allProducts.filter(
        (product) => product.id == order.productId
      );
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderByUser = async ({ id }) => {
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

    const { rows: allProducts } = await client.query(`
      SELECT *
      FROM products
      
    `);

    orders.forEach((order) => {
      order.products = allProducts.filter(
        (product) => product.id == order.productId
      );
    });

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

    const { rows: allProducts } = await client.query(`
      SELECT *
      FROM products
      
    `);

    orders.forEach((order) => {
      order.products = allProducts.filter(
        (product) => product.id == order.productId
      );
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderByProduct = async ({ id }) => {
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

    const { rows: allProducts } = await client.query(`
      SELECT *
      FROM products
      
    `);

    orders.forEach((order) => {
      order.products = allProducts.filter(
        (product) => product.id == order.productId
      );
    });

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

    const { rows: allProducts } = await client.query(`
      SELECT *
      FROM products
      
    `);

    orders.forEach((order) => {
      order.products = allProducts.filter(
        (product) => product.id === order.productId
      );
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async ({ id, status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET status = $1
        WHERE id = ${id}
        RETURNING *;
      `,
      [status]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const completeOrder = async ({ id }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET status = 'completed'
        WHERE id = ${id}
        RETURNING *;
      `
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const cancelOrder = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET status = 'cancelled'
        WHERE id = ${id}
        RETURNING *;
      `
    );
    return order;
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
  updateOrder,
  completeOrder,
  cancelOrder,
};
