import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import "../styles/Store.css";
import { useProduct } from "./context/Context";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { handleAddProduct } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <section id="store" className="container">
        <h2>Our Store</h2>

        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <Link to={`/store/${item.id}`} className="product-link">
                <h3>{item.title.slice(0, 20)}...</h3>
                <div className="image-container">
                  <img
                    className="prod-image"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </Link>

              <div className="prod-details">
                <span>${item.price}</span>
                <button
                  className="shop-item-button"
                  type="button"
                  onClick={() => handleAddProduct(item)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="cart-btn-bottom" onClick={() => setShowCart(true)}>
        SEE THE CART
      </button>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
      <Footer />
    </div>
  );
};

export default Store;
