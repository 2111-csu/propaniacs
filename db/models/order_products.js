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
    // console.log("orderProduct", orderProduct);
    // if (orderProduct.productId) {
    //   console.log("This product already exists in the order");
    //   return;
    // } else {
    //   console.log("added product to order", orderProduct);
    //   return orderProduct;
    // }
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
