import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { getProducts } from "../axios-services";
import { callApi } from "../axios-services";
import SnackBar from "./SnackBar";

const AllProducts = ({ token, id, cart, setCart }) => {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get("searchTerm") || "";
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);

      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });
      setCart(userCart.data);
    };

    getAllProducts();
  }, [token, setCart]);

  const productMatcher = (product, searchTerm) => {
    const { name, category, price } = product;
    const toCheck = [name, category, price];
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  };

  const handleAdd = async (event, productId, price, quantity, cart) => {
    event.preventDefault();
    try {
      const addedToCart = await callApi({
        url: `/api/orders/${cart[0].orderId}/products`,
        token,
        method: "POST",
        data: {
          productId,
          price: Number(price),
          quantity: Number(quantity),
        },
      });
      SnackBar();
      setCart(addedToCart, ...cart);
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    productMatcher(product, searchTerm)
  );

  const filterProducts = (category) => {
    history.push(`/products?searchTerm=${category}`);
  };

  return (
    <>
      <div id="snackbar">"Added to cart, thank you kindly!"</div>
      <div id="Container-Search-Category">
        <div id="searchContainer">
          <input
            id="search"
            type="text"
            placeholder="SEARCH"
            onChange={(e) => {
              history.push(
                e.target.value
                  ? `/products?searchTerm=${e.target.value}`
                  : "/products"
              );
            }}
          ></input>
        </div>
        <div id="categoryContainer">
          <button type="submit" onClick={() => filterProducts("Propane")}>
            Propane
          </button>
          <button type="submit" onClick={() => filterProducts("Accessories")}>
            Accessories
          </button>
          <button type="submit" onClick={() => filterProducts("Grills")}>
            Grills
          </button>
          <button type="submit" onClick={() => history.push("/products")}>
            All Products
          </button>
        </div>
      </div>
      <div className="cards">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id}>
              <div className="card">
                <div className="card__text">
                  <Link to={`/products/${product.id}`}>
                    <div className="card__title">{product.name}</div>
                  </Link>
                  <img className="products" src={product.imageURL} alt="" />
                  <div className="card__subtitle">
                    {" "}
                    Category: {product.category}
                  </div>
                  <div className="card__subtitle"> Price: ${product.price}</div>
                  {product.inStock === true ? (
                    <div className="card__subtitle"> inStock: Yes</div>
                  ) : (
                    <div className="card__subtitle"> inStock: No</div>
                  )}
                  {product.inStock === true ? (
                    <>
                      <br></br>
                      <input
                        type="number"
                        id="prodQuantity"
                        placeholder="Quantity"
                        min="0"
                        onChange={(event) => setQuantity(event.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={(event) =>
                          handleAdd(
                            event,
                            product.id,
                            product.price,
                            quantity,
                            cart
                          )
                        }
                      >
                        Add To Cart
                      </button>
                    </>
                  ) : (
                    <h2>OUT OF STOCK</h2>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
