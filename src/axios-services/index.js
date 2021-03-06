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

export const callApi = async ({ url, method = "GET", token, data }) => {
  try {
    const options = {
      url,
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: data,
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("options from callApi", options);
    const resp = await axios(options);

    console.log("callApi response", resp);

    if (resp.error) {
      console.log(resp.error);
      throw resp.error;
    }
    return resp;
  } catch (error) {
    console.log(error);
  }
};

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

export async function getCartByUser(id) {
  try {
    const { data: cart } = await axios.get("/api/cart", { id });
    console.log("cart from axios", cart);
    return cart;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`/api/account/login`, {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function profileUser() {
  try {
    const { data } = await axios.get(`/api/account/me`);
    console.log(data, "data from profileUser");
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addToCart(id) {
  try {
    const { data } = await axios.post(`api/orders/:orderId/products`, { id });
    console.log(data, "data from addToCart");
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
    const { data } = await axios.post(`/api/account/register`, {
      username,
      password,
      firstName,
      lastName,
      email,
      isAdmin,
    });
    console.log(data, "data from createUser");

    localStorage.setItem("token", data.token);
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
