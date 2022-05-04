import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { callApi } from "../axios-services";

const SingleProduct = ({ token, id, cart, setCart }) => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0)
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
      console.log(userCart, "Api call to get cart");
      setCart(userCart.data);
    };

    getSingleProduct(productId);
  }, [productId, setCart, token]);

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
    <div>
      <h1 className="subjects">Single Product</h1>
        <div className="singleContainer">
          <div className="card__text">
            <div key={product.id}>
              <div id="singleTextContainer">
              <p className="single__subtitle">Product Name:{product.name}</p>
              <p className="single__subtitle">Product Description:{product.description}</p>
              <p className="single__subtitle">Product Price:{product.price}</p>
              <p className="single__subtitle">Product inStock:{product.inStock}</p>
              <p className="single__subtitle">Product Category:{product.category}</p>
            </div>
          </div>
          <input type ="number" name="quantity" placeholder="Quantity" min = "0" value = {quantity} onChange = {(event) => setQuantity(event.target.value)}/>
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
        </div>
        <img id="singleimg" className ="products" src={product.imageURL} alt=""/>
      </div>
    </div>
  );
};

export default SingleProduct;
