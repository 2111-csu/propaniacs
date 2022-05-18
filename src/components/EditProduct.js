import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";
import { getProductById } from "../axios-services";

const EditProduct = ({ token }) => {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [image, setImage] = useState(null);
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    const getSingleProduct = async (id) => {
      const singleProduct = await getProductById(id);
      setProduct(singleProduct);
    };
    getSingleProduct(productId);
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await callApi({
        url: `/api/products/edit/${productId}`,
        method: "PATCH",
        token,
        data: {
          name,
          description,
          imageURL: image,
          inStock,
          category,
          price: Number(price),
        },
      });

      history.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="editContainer">
        <div className="OldContainer">
          <div className="card__text">
            <h1>PREVIOUS ENTRY</h1>
            <div key={product.id}>
              <div id="singleTextContainer">
                <p className="single__subtitle">Product Name: {product.name}</p>
                <p className="single__subtitle">
                  Product Description: {product.description}
                </p>
                <p className="single__subtitle">
                  Product Price: ${product.price}
                </p>
                <p className="single__subtitle">
                  Product Category: {product.category}
                </p>
                {product.inStock === true ? (
                  <div className="card__subtitle"> inStock: Yes</div>
                ) : (
                  <div className="card__subtitle"> inStock: No</div>
                )}
              </div>
            </div>
          </div>
          <img
            id="singleimg"
            className="products"
            src={product.imageURL}
            alt=""
          />
        </div>
        <div className="NewContainer">
          <div className="card__text">
            <h1>EDIT PRODUCT INFORMATION</h1>
            {/* <div key={product.id}> */}
            <form class="input" onSubmit={handleSubmit}>
              <div id="singleTextContainer">
                <label>Product Name:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <br></br>
                <label>Product Description:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                <br></br>
                <label>Product Price:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                <br></br>
                <label>Product Category:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
                <br></br>
                <label>In Stock: </label>
                <input
                  type="checkbox"
                  placeholder="true/false"
                  value={inStock}
                  onChange={(e) => setInStock(true)}
                ></input>
                <input
                  type="text"
                  placeholder="URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <div id="center">
                  <button type="submit">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
