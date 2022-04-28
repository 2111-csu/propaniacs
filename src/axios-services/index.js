import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getProducts() {
  try {
    const { data: products } = await axios.get("/api/products");
    return products;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(id) {
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);
    return product;
  } catch (err) {
    console.error(err);
  }
}

export async function getOrderById(id) {
  try {
    const { data: order } = await axios.get(`/api/orders/${id}`);
    console.log(order);
    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      username,
      password,
    });
    console.log(data, "data from loginUser");
    localStorage.setItem("token", data.token)
    return data;
  } catch (err) {
    throw err;
  }
}

export async function profileUser() {
  try {
    const { data } = await axios.get(`/api/account/me`)
    console.log(data, "data from profileUser");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createUser(
  username,
  password,
  firstName,
  lastName,
  email,
  isAdmin
) {
  try {
    const { data } = await axios.post(`/api/users/register`, {
      username,
      password,
      firstName,
      lastName,
      email,
      isAdmin,
    });
    console.log(data, "data from createUser");

    localStorage.setItem("token", data.token)
    return data;  
  } catch (err) {
    throw err;
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
