import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <ul className="nav-list">
        {/* Center links */}
        <div className="nav-center">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/store" className="nav-link">Store</NavLink>
          </li>
        </div>
        <div className="nav-right">      
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">Cart 0</NavLink>
            </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
