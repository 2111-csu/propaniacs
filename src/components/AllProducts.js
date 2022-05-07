import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../axios-services";
import { callApi } from "../axios-services";

const AllProducts = ({ token, id, cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);

      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });
      console.log(userCart, "Api call to get cart");
      setCart(userCart.data);
    };

    getAllProducts();
  }, [token, setCart]);

  const handleAdd = async (event, productId, price, quantity, cart) => {
    event.preventDefault();
    console.log(cart, "cart going through handle submit");
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

      setCart(addedToCart, ...cart);
      console.log(cart, "cart after Add");
      return cart;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="subjects">AllProducts</h1>
      <div className="cards">
      {products.map((product) => {
        return (
          <div key={product.id}>
              <div className="card">
                <div className="card__text">
                  <Link to={`/products/${product.id}`}>
                    <div className="card__title">{product.name}</div>
                  </Link>
                  <img className="products" src={product.imageURL} alt="" />
                  <br></br>
                  <div className="card__subtitle"> Price: ${product.price}</div>
                  {product.inStock === true
                    ?<div className="card__subtitle">
                    {" "}
                    inStock: Yes
                    </div>
                    :<div className="card__subtitle">
                    {" "}
                    inStock: No
                    </div>
                  }
                  <br></br>
                  {product.inStock === true
                  ?<>
                  <input
                    type ="number"
                    id = "prodQuantity"
                    placeholder="Quantity" 
                    min = "0" 
                    onChange = {(event) => setQuantity(event.target.value)}
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
                  >Add To Cart
                  </button>
                  </>
                  :<h2>OUT OF STOCK</h2>
                }
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
