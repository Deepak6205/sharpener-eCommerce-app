
import "../styles/Cart.css";
import { useProduct } from "./context/Context";

const Cart = ({onClose}) => {
  // const [cartElm, setCartElm] = useState([
  //   {
  //     title: "Colors",
  //     price: 100,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  //     quantity: 2,
  //   },
  //   {
  //     title: "Black and white Colors",
  //     price: 50,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  //     quantity: 3,
  //   },
  //   {
  //     title: "Yellow and Black Colors",
  //     price: 70,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  //     quantity: 1,
  //   },
  // ]);
  // const handleRemove = (index) => {
  //   const updatedCart = cartElm.filter((_, i) => i !== index);
  //   setCartElm(updatedCart);
  // };

  // const total = cartElm.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );
  const {cartElm,handleRemove} = useProduct();
  const total = cartElm.reduce(
    (acc, item) => acc + item.price,
    0
  );
  return (
    <section id="cart" className="container" style={{ display: "block" }}>
      <h2>CART</h2>
      <button className="cancel" onClick={onClose}>X</button>
      <div className="cart-row cart-header">
        <span className="cart-item cart-column">ITEM</span>
        <span className="cart-price cart-column">PRICE</span>
        <span className="cart-quantity cart-column">QUANTITY</span>
      </div>
      <div className="cart-items">
        {cartElm.map((item, i) => {
          return (
            <div className="cart-row" id="in-cart-album" key={i}>
              <span className="cart-item cart-column">
                <img className="cart-img" src={item.imageUrl} alt="" />
                <span>{item.title.slice(0,5)+".."}</span>
              </span>
              <span className="cart-price cart-column">{item.price}</span>
              <span className="cart-quantity cart-column">
                <input type="text" value='1'/>
                <button onClick={()=>handleRemove(i)}>REMOVE</button>
              </span>
            </div>
          );
        })}
      </div>
      <div className="cart-total">
        <span>
          <span className="total-title">
            <strong>Total - {"  "}</strong>
          </span>
          $<span id="total-value">{total}</span>
        </span>
      </div>
      <button className="purchase-btn" type="button">
        PURCHASE
      </button>
    </section>
  );
};

export default Cart;
