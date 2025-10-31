import React from "react";
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer>
      <div className="footer-title">The Generics</div>
      <div className="footer-icons">
        <ul>
          <li>
            <a href="https://www.youtube.com">
              <img style={{width: "39px", height:"38px"}}
                src="https://i.pinimg.com/736x/7d/dc/54/7ddc545046b212d9ecc8eef83569222b.jpg"
                alt=""
              />
            </a>
          </li>
          <li>
            <a href="https://spotify.com">
              <img
                src="https://png.pngtree.com/element_our/png/20181011/spotify-social-media-icon-design-template-vector-png_127005.jpg"
                alt=""
              />
            </a>
          </li>
          <li>
            <a href="https://facebook.com">
              <img
                src="https://i.pinimg.com/736x/63/a2/31/63a231592efca78f2bcbc02267eb37be.jpg"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
