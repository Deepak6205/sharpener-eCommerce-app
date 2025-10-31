import "../styles/Cart.css";
import { useProduct } from "./context/Context";

const Cart = ({ onClose }) => {
  const { cartElm, handleRemove } = useProduct();
  const total = cartElm.reduce((acc, item) => acc + item.price, 0);

  return (
    <section id="cart" className="container" style={{ display: "block" }}>
      <h2>CART</h2>
      <button className="cancel" onClick={onClose}>
        X
      </button>
      <div className="cart-row cart-header">
        <span className="cart-item cart-column">ITEM</span>
        <span className="cart-price cart-column">PRICE</span>
        <span className="cart-quantity cart-column">QUANTITY</span>
      </div>
      <div className="cart-items">
        {cartElm.map((item) => (
          <div
            className="cart-row"
            id="in-cart-album"
            key={item._id || item.title}
          >
            <span className="cart-item cart-column">
              <img
                className="cart-img"
                src={item.image || item.imageUrl}
                alt={item.title}
              />
              <span>{item.title.slice(0, 10) + ".."}</span>
            </span>
            <span className="cart-price cart-column">${item.price}</span>
            <span className="cart-quantity cart-column">
              <input type="text" value="1" readOnly />
              <button onClick={() => handleRemove(item._id)}>REMOVE</button>
            </span>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <span>
          <span className="total-title">
            <strong>Total - {"  "}</strong>
          </span>
          $<span id="total-value">{total.toFixed(2)}</span>
        </span>
      </div>
      <button className="purchase-btn" type="button">
        PURCHASE
      </button>
    </section>
  );
};

export default Cart;
