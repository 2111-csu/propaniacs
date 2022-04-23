const {
  client,
  Products,
  // declare your model imports here
  // for example, User
} = require("./");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");

    throw error;
  }
}

async function createTables() {
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");

    await client.query(`

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      "imageURL" VARCHAR(255) DEFAULT '',
      "inStock" BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) UNIQUE NOT NULL,
      "lastName" VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL,
      "isAdmin" BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT 'created',
      "userId" SERIAL REFERENCES users(id),
      "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0
    );

  `);
  } catch (error) {
    console.error(error, "Error constructing tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables();
    // build tables in correct order
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const productsToCreate = [
      {
        name: "5 Gallon Tank",
        description: "5 Gallons of Propane",
        price: 20,
        imageURL: "text",
        inStock: true,
        category: "Propane",
      },
      {
        name: "Weber 3000",
        description: "4 burner propane grill",
        price: 300,
        imageURL: "text",
        inStock: true,
        category: "Grill",
      },
      {
        name: "Tongs",
        description: "Stainless Steel",
        price: "5",
        imageURL: "text",
        inStock: true,
        category: "Accessories",
      },
    ];
    const products = await Promise.all(
      productsToCreate.map(Products.createProduct)
    );
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating Products!");
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
