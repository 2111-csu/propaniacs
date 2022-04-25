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

module.exports = {
  createOrder,
};
