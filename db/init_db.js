const {
  client,
  Products,
  Users,
  Orders,
  Order_products,
  // declare your model imports here
  // for example, User
} = require("./");
const {
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
} = require("./models/order_products");

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
      price NUMERIC NOT NULL,
      "imageURL" VARCHAR(255) DEFAULT '',
      "inStock" BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
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
        name: "10 Gallon Tank",
        description: "Your everyday tank for everyday use",
        price: 10,
        imageURL: "https://cdn11.bigcommerce.com/s-vmvni2zq0j/images/stencil/1280x1280/products/37046/53046/apisaus4j__46352.1581525335.jpg?c=2",
        inStock: true,
        category: "Propane",
      },,
      {
        name: "Weber 3000",
        description: "4 burner propane grill",
        price: 300,
        imageURL: "https://images.thdstatic.com/productImages/7060e02f-7f30-425c-99b7-90ec2075cb52/svn/nexgrill-propane-grills-720-0830x-64_600.jpg",
        inStock: true,
        category: "Grill",
      },
      {
        name: "Tongs",
        description: "Stainless Steel",
        price: "5",
        imageURL: "https://cdnimg.webstaurantstore.com/images/products/large/64806/780284.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Spatula",
        description: "Heat Resistant",
        price: "10",
        imageURL: "https://images.thdstatic.com/productImages/ff39bed3-16e5-4a3a-a5d8-3e3ae2cff6fb/svn/weber-grill-spatulas-6620-64_600.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "250 Gallon Tank",
        description: "This tank is perfect to power your whole home! Speak with one of our agents for monthly service.",
        price: 999,
        imageURL: "https://images.kleen-ritecorp.com/images/product/large/37895.jpg",
        inStock: true,
        category: "Propane",
      },
      {
        name: "Char-King Deluxe",
        description: "The ultimate experience in grilling. This 10 burner grill will crown you king of the block party!",
        price: 600,
        imageURL: "https://images.thdstatic.com/productImages/9cceae15-cc4b-434c-9d44-4e1feb9b5169/svn/monument-grills-propane-grills-77352-64_600.jpg",
        inStock: true,
        category: "Grill",
      }
    ];

    const products = await Promise.all(
      productsToCreate.map(Products.createProduct)
    );
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating Products!");

    const usersToCreate = [
      {
        firstName: "Hank",
        lastName: "Hill",
        email: "PropaneHank@strick-landpropane.com",
        username: "KingOfTheHill",
        password: "propaneIsBeautiful",
        isAdmin: true,
      },
      {
        firstName: "Bobby",
        lastName: "Hill",
        email: "damnitbobby@gmail.com",
        username: "damnitbobby",
        password: "password",
        isAdmin: false,
      },
      {
        firstName: "Peggy",
        lastName: "Hill",
        email: "peggy.hill@yahoo.com",
        username: "peggyhill",
        password: "arlington",
        isAdmin: false,
      },
    ];
    const users = await Promise.all(usersToCreate.map(Users.createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating Users!");

    const ordersToCreate = [
      {
        status: "created",
        userId: 1,
      },
      {
        status: "cancelled",
        userId: 2,
      },
      {
        status: "completed",
        userId: 3,
      },
    ];
    const orders = await Promise.all(ordersToCreate.map(Orders.createOrder));
    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating Orders!");

    const orderProductsToCreate = [
      {
        productId: 1,
        orderId: 1,
        price: 20,
        quantity: 1,
      },
      {
        productId: 2,
        orderId: 1,
        price: 300,
        quantity: 1,
      },
      {
        productId: 3,
        orderId: 1,
        price: 5,
        quantity: 1,
      },
      {
        productId: 4,
        orderId: 1,
        price: 10,
        quantity: 5,
      },

      {
        productId: 1,
        orderId: 2,
        price: 20,
        quantity: 1,
      },
      {
        productId: 2,
        orderId: 2,
        price: 300,
        quantity: 1,
      },
      {
        productId: 1,
        orderId: 3,
        price: 20,
        quantity: 1,
      },
    ];
    const orderProducts = await Promise.all(
      orderProductsToCreate.map(Order_products.addProductToOrder)
    );
    console.log("Order_products created:");
    console.log(orderProducts);
    console.log("Finished creating Order_products!");

    console.log("Fetching Orders");
    const allOrders = await Orders.getAllOrders();

    console.log(allOrders);
    console.log("Finished fetching all orders!");

    console.log("Fetching Order by user");
    const orderByUser = await Orders.getOrderByUser({ id: 1 });
    console.log(orderByUser);
    console.log("Finished fetching order by user!");

    console.log("Fetching Order by id");
    const orderById = await Orders.getOrderById(2);
    console.log(orderById);
    console.log("Finished fetching order by Id");

    console.log("Fetching Order by product");
    const orderByProduct = await Orders.getOrderByProduct({ id: 3 });
    console.log(orderByProduct);
    console.log("Finished fetching order by product!");

    console.log("Fetching Order by user's cart");
    const cartByUser = await Orders.getCartByUser(1);
    console.log(cartByUser);
    console.log("Finished fetching cart by user!");

    console.log("Getting order_product by id");
    const OrderProductById = await getOrderProductById({ id: 1 });
    console.log(OrderProductById);
    console.log("Finished getting order_product by Id");

    console.log("Updating order Product");
    const OrderProduct = await updateOrderProduct({
      id: 1,
      price: 100,
      quantity: 3,
    });
    console.log(OrderProduct);
    console.log("Finished getting order_product by Id");

    console.log("Deleting order Product (6 order_products)");
    const destroyedProduct = await destroyOrderProduct(6);
    console.log(destroyedProduct);
    console.log("Finished deleting order product");

    console.log("Updating Order");
    const orderToUpdate = await Orders.updateOrder({
      id: 2,
      status: "created",
    });
    console.log(orderToUpdate);
    console.log("Finished updated order");

    console.log("Completing Order");
    const orderToComplete = await Orders.completeOrder({
      id: 2,
    });
    console.log(orderToComplete);
    console.log("Order completed");

    console.log("Canceling Order");
    const orderToCancel = await Orders.cancelOrder(2);
    console.log(orderToCancel);
    console.log("Order Canceled");
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
