import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "./context/Context";
import "../styles/ProductDetails.css";

const ProductDetails = ({ onCartClick }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { handleAddProduct } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="product-details">
      <div className="details-card">
        <img className="details-image" src={product.image} alt={product.title} />
        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="details-desc">{product.description}</p>
          <h3>${product.price}</h3>

          <div className="btn-group">
            <button
              className="shop-item-button"
              onClick={() => handleAddProduct(product)}
            >
              ADD TO CART
            </button>
            <button
              className="see-cart-btn"
              onClick={onCartClick}
            >
              SEE THE CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
