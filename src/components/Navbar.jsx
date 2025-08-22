import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { useProduct } from "./context/Context";

const Navbar = ({onCartClick}) => {
  const location = useLocation();
  const {cartElm} = useProduct();
  return (
    <div className="nav-container">
      <ul className="nav-list">
        {/* Center links */}
        <div className="nav-center">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/store" className="nav-link">
              Store
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/movie" className="nav-link">
              Movie
            </NavLink>
          </li>
        </div>
        <div className="nav-right">
          {location.pathname === "/store" && (
            <li className="nav-item">
              <button className="nav-link cart-btn" onClick={onCartClick}>
                Cart-{cartElm.length}
              </button>
            </li>
          )}
        </div>
        
      </ul>
    </div>
  );
};

export default Navbar;
