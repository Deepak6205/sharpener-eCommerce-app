import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useProduct } from "./context/Context";
import { useAuth } from "./context/AuthContext"; 

const Navbar = ({ onCartClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartElm } = useProduct();
  const { logout } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="nav-container">
      <ul className="nav-list">
        <div className="nav-center">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/store" className="nav-link">Store</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/movie" className="nav-link">Movie</NavLink>
          </li>
        </div>

        <div className="nav-right">
          {(location.pathname.startsWith("/store") ||
            location.pathname.startsWith("/product")) && (
            <li className="nav-item">
              <button className="nav-link cart-btn" onClick={onCartClick}>
                Cart-{cartElm.length}
              </button>
            </li>
          )}

          
          <li className="nav-item">
            <button className="nav-link change-password-btn" onClick={handleChangePassword}>
              Change Password
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
