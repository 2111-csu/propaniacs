import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";
import ComingSoon from "../style/ComingSoon.jpg"

const AddProduct = ({token}) => {
  const history = useHistory();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(Number)
  const [category, setCategory] = useState("")
  const [inStock, setInStock] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const newProduct = await callApi({
        url: `/api/products`,
        method: "POST",
        token,
        data: {
          name,
          description,
          imageURL: ComingSoon,
          inStock,
          category,
          price: Number(price),
        },
      });
      console.log(newProduct, "New Product in Add Product Component");

      history.push("/products");
      return newProduct
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
        <div className="newSingleContainer">
          <h1>ENTER NEW PRODUCT INFO</h1>
          <div id="newTextImgContainer">
            <form class ="input" onSubmit={handleSubmit} >
              {/* <div key={product.id}> </div> */}
                <div id="newSingleTextContainer">
                  <label>Product Name:</label>
                  <input 
                    class ="newInput"
                    type = "text" 
                    placeholder = "" 
                    value = {name}
                    onChange={(e) => setName(e.target.value)}>
                  </input>
                  <label>Description:</label>
                  <input 
                    class ="newInput"
                    type = "text" 
                    placeholder = "" 
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}>
                  </input>  
                  <label>Price:</label>         
                  <input 
                    class ="newInput"
                    type = "text" 
                    placeholder = "Price" 
                    value = {price}
                    onChange={(e) => setPrice(e.target.value)}>
                  </input> 
                  <label>Category:</label>               
                  <input 
                    class ="newInput"
                    type = "text" 
                    placeholder = "PROPANE/ACCESSORIES/GRILLS" 
                    value = {category}
                    onChange={(e) => setCategory(e.target.value)}>
                  </input>
                  <br></br>
                  <label>In Stock: </label>               
                  <input 
                    type = "checkbox" 
                    placeholder = "" 
                    value = {inStock}
                    onChange={(e) => setInStock(true)}>
                  </input>
                  <div id="center">
                    <button type = "submit">SUBMIT</button>
                  </div>
              </div>
          </form>
          <img 
            id="ComingSoonImg" 
            className ="products" 
            src={ComingSoon} alt="Coming Soon"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
