import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { callApi } from "../axios-services";
import SnackBar from "./SnackBar";

const SingleProduct = ({ token, cart, setCart }) => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const { productId } = useParams();

  useEffect(() => {
    const getSingleProduct = async (id) => {
      const singleProduct = await getProductById(id);
      setProduct(singleProduct);

      const userCart = await callApi({
        url: "/api/cart",
        token,
        method: "GET",
      });
      setCart(userCart.data);
    };

    getSingleProduct(productId);
  }, [productId, setCart, token]);

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

  return (
    <div>
      <div id="snackbar">"Added to cart, thank you kindly!"</div>
      <div className="singleContainer">
        <div className="card__text">
          <div key={product.id}>
            <div id="singleTextContainer">
              <p className="single__subtitle">
                <h2>Product Name: {product.name}</h2>
              </p>
              <p className="single__subtitle">
                <b>Product Description:</b> {product.description}
              </p>
              <p className="single__subtitle">
                <b>Product Price:</b> ${product.price}
              </p>
              <p className="single__subtitle">
                <b>Product Category:</b> {product.category}
              </p>
              {product.inStock === true ? (
                <>
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
            <br></br>
          </div>
        </div>
        <img
          id="singleimg"
          className="products"
          src={product.imageURL}
          alt=""
        />
      </div>
    </div>
  );
};

export default SingleProduct;
