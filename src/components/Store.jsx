import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Store.css";
import { useProduct } from "./context/Context";

const Store = () => {
  const [product] = useState([
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },
    {
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ]);
  const {handleAddProduct} = useProduct();
  return (
    <div>
      <Header />
      <section id="music" className="container">
        <h2>COLORS</h2>

        <div className="music-content">
          {product.map((item, i) => {
            return (
              <div key={i} className="music-item">
                <h3>{item.title}</h3>

                <div className="image-container">
                  <img
                    className="prod-images"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>

                <div className="prod-details">
                  <span>${item.price}</span>
                  <button className="shop-item-button" type="button" onClick={()=>handleAddProduct(item)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <button className="cart-btn-bottom">SEE THE CART</button>
      <Footer />
    </div>
  );
};

export default Store;
