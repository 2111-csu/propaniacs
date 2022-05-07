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
      price NUMERIC NOT NULL,
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
        price: 29.95,
        imageURL: "https://cdn11.bigcommerce.com/s-vmvni2zq0j/images/stencil/1280x1280/products/37046/53046/apisaus4j__46352.1581525335.jpg?c=2",
        inStock: true,
        category: "Propane",
      },
      {
        name: "Weber 3000",
        description: "A mighty fine starter grill. The 4 burners are great for meats, veggies, or anything else you'd like to grill",
        price: 550,
        imageURL: "https://images.thdstatic.com/productImages/7060e02f-7f30-425c-99b7-90ec2075cb52/svn/nexgrill-propane-grills-720-0830x-64_600.jpg",
        inStock: true,
        category: "Grill",
      },
      {
        name: "Tongs",
        description: "Strong enough to lift the heaviest items, these tongs are a must for any grill master",
        price: 4.05,
        imageURL: "https://cdnimg.webstaurantstore.com/images/products/large/64806/780284.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Spatula",
        description: "Equipped with a long, ergonomic handle, this stainless steel spatula is a joy to use.",
        price: 7.99,
        imageURL: "https://images.thdstatic.com/productImages/ff39bed3-16e5-4a3a-a5d8-3e3ae2cff6fb/svn/weber-grill-spatulas-6620-64_600.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "250 Gallon Tank",
        description: "7'10' long & 30 inches in diameter, this tank is ideal to heat water heaters, generators, & pool heaters",
        price: 999.49,
        imageURL: "https://images.kleen-ritecorp.com/images/product/large/37895.jpg",
        inStock: true,
        category: "Propane",
      },
      {
        name: "Char-King Deluxe",
        description: "The ultimate experience in grilling. This 10 burner grill will crown you king of the block party!",
        price: 875.00,
        imageURL: "https://images.thdstatic.com/productImages/9cceae15-cc4b-434c-9d44-4e1feb9b5169/svn/monument-grills-propane-grills-77352-64_600.jpg",
        inStock: true,
        category: "Grill",
      },
      {
        name: "Grill Brush",
        description: "Durable steel bristles like these make cleaning the grill grates a breeze!",
        price: 10.25,
        imageURL: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS3pyHEcX2IZUIwbII2m42oTMjCAQF-Ke2yvAVejJCnDzDO0rJPC3Fh01y4Y7JPKIkmB-fItS6gsCY&usqp=CAc",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "3 Gallon Tank",
        description: "This tank is reinforced for travel purposes. It is a MUST for a convenient weekend getaway.",
        price: 14.99,
        imageURL: "https://media.istockphoto.com/photos/green-propane-gas-cylinder-with-burner-isolated-on-white-background-picture-id1304941224?k=20&m=1304941224&s=612x612&w=0&h=3PnSLWcXk8SPxrid7Imew4uzpcpbdcJxvrAfpf5vQlA=",
        inStock: true,
        category: "Propane",
      },
      {
        name: "Strick-Land Apron",
        description: "If you're as excited by propane as we are, this apron will prove it!",
        price: 22.55,
        imageURL: "https://media.customon.com/unsafe/600x600/img.customon.com/img/19388821/64186,34,2,0,62,112,122,12,0,efe26d1370c0de0a82bd06a8287f9188/merchantimagenew/strickland-propane-apron-white.jpg",
        inStock: false,
        category: "Accessories",
      },
      {
        name: "BBQ Fork",
        description: "A tool you don't realize you need until you do; buy it now & you won't regret it!",
        price: 9.95,
        imageURL: "https://i5.walmartimages.com/asr/2b1d3727-165c-420a-baa5-ecb4d5b4c6ae.6be2d70d75eb0295c4ffb8c67ddcf7a9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Grill-N-Go",
        description: "A must for grillers who travel; this grill is perfect for camping, tailgating, & more!",
        price: 150.15,
        imageURL: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSpjauS3RZ8S4PQuNiLZL3Gq3wPBRFcqY8-GRLpyDWaHWOHpIVHVmp3CbikrWPihOZ8GflRxuQRey0&usqp=CAc",
        inStock: false,
        category: "Grill",
      },
      {
        name: "Meat Thermometer",
        description: "Ever wondered if something is medium-rare or medium? This thermometer can make that decision easier to manage.",
        price: 88.95,
        imageURL: "https://m.media-amazon.com/images/I/61PrtmadiJL._SX342_.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Grill Skewers",
        description: "When wooden skewers won't do, look to these reliable stainless skewers.",
        price: 4.49,
        imageURL: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQvGYumWJo3EQal_s3e_kEkscrfCe6ByasF4nCxENyW4BcH6HE_J28Eo006d6dDAtI-fd3zZEJDeg&usqp=CAc",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "BBQ Mop",
        description: "Any BBQ enthusiast will stand by the mop as the ideal BBQ applicator.",
        price: 11.11,
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEW6UsNVezsNEVND0rSnhLOZY6ZuwjyblHeA&usqp=CAU",
        inStock: false,
        category: "Accessories",
      },
      {
        name: "1000 Gallon Tank",
        description: "Just over 16 feet long & 41 inches in diameter, this is the tank you need for large square footage homes & when multiple appliances run on propane.",
        price: 2200,
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEO9mUDcQ1vX9_ga7redt4O27yQZRkwrx6A&usqp=CAU",
        inStock: false,
        category: "Propane",
      },
      {
        name: "VW9 Smoker",
        description: "Not only does this smoker run off propane, but it also has a convenient window to check on its contents!",
        price: 1210.15,
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmqDpIbrqJu7HWadpN80BaXBSt--Bo6tttjQ&usqp=CAU",
        inStock: true,
        category: "Grill",
      },
      {
        name: "BBQ Gloves",
        description: "Insulated, waterproof, heat/oil resistant. What more could you ask for from these fine gloves?",
        price: 32.35,
        imageURL: "https://images.thdstatic.com/productImages/596d2b96-694f-497f-8eff-fdafd8f0a736/svn/g-f-products-grilling-gloves-8119-64_400.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Grill Mat",
        description: "This polyvinyl mat will protect your deck/patio.",
        price: 34.49,
        imageURL: "https://images.thdstatic.com/productImages/8cdc0da9-a419-4445-bfd3-3f2f77c3c27e/svn/g-floor-deck-grill-mats-gm45dt4732mb-64_400.jpg",
        inStock: true,
        category: "Accessories",
      },
      {
        name: "Grill Cleaner",
        description: "Our patented solution; this cleaner will have your grill looking as good as new!",
        price: 7.95,
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82IIQAsLDaDRN5CNND_3S69QvJvG4iAZ3teRD1rvOC5Cfpg8WTe6HnxcuiLj8EV1dcGg&usqp=CAU",
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
