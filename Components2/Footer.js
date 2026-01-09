import React from "react";
import "./Styles/Footer.css"
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Footer = () => {
  const navigate=useNavigate()
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand */}
        <div className="footer-brand">
          <div className="brand-logo">
            {/* <span className="logo-circle">T</span> */}
            <span className="brand-text">
            <img src={logo} width={"120px"} height={"50px"} alt="logo"/>
            </span>
          </div>

          <p>
            Delivering happiness to your doorstep.
            <br />
            Fresh, delicious meals prepared with love.
          </p>

          <div className="socials">
            <span>f</span>
            <span>🐦</span>
            <span>📷</span>
          </div>
        </div>

        {/* Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <span onClick={()=>navigate("/home")}>Home</span>
          <span onClick={()=>navigate("/order")}>My Orders</span>
          <span onClick={()=>navigate("/dashboard")}>Dashboard</span>
          <span onClick={()=>navigate("/profile")}>Profile</span>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <span>Vegetarian</span>
          <span>Non-Vegetarian</span>
          <span>Snacks</span>
          <span>Drinks</span>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <span>✉ SuryaMart@gmail.com</span>
          <span>📞 +91 6385454860</span>
          <span>📍 123 boyace garden chennai 600028</span>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 TastyBites. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
