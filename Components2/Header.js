import React, { useState } from "react";
import "./Styles/Header.css"
import { useAppContext } from "./Context";
import { FiUser } from "react-icons/fi";
import logo from "../assets/logo.png"
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    
    const token=localStorage.getItem("token")
    const {count,cartItems,setLogout}=useAppContext()
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate=useNavigate()
    const handleLogout=()=>{
      setLogout(true)
    }
   

  return (
    <>
      <nav className="navbar">
        {/* Left */}
        <div className="logo" onClick={()=>navigate("/home")}>
          {/* <div className="logo-circle">S</div> */}
          <span className="brand">
            <img src={logo} width={"120px"} height={"50px"} alt="logo"/>
          </span>
        </div>

        {/* Center */}
        <div className="nav-links">
          <NavLink to="/home" className="nav-item" onClick={()=>navigate("/home")}>
            <span className="nav-icon">🏠</span> Home
          </NavLink>
          <NavLink to="/order"  className="nav-item" onClick={()=>navigate("/order")}>
            <span className="nav-icon">📋</span> Orders
          </NavLink>
          <NavLink to="/dashboard"  className="nav-item" onClick={()=>navigate("/dashboard")}>
            <span className="nav-icon">▦</span> Dashboard
          </NavLink>
        </div>

        {/* Right */}
        <div className="nav-actions">
          <NavLink to="/card" className="cart-icon"  onClick={()=>navigate("/card")}>🛒{cartItems?.length > 0 && (<span className="cart-count">{count}</span>)}</NavLink>
          {token ? (<>
            <NavLink to="/profile" className="user-icon" onClick={()=>navigate("/profile")}><FiUser/></NavLink>
            <span className="logout-link" onClick={handleLogout} >Logout</span>
            </>):(<>
            <NavLink to="/" className="login-link" onClick={()=>navigate("/")}>Login</NavLink>
            <NavLink to="/signup"  className="signup-btn" onClick={()=>navigate("/signup")}>Sign Up</NavLink>
            </>)}
        </div>
      

      
        {/* Hamburger */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>

        {/* Mobile menu */}
        <div className={`mobile-actions ${menuOpen ? "open" : ""}`}>
          <NavLink to="/home" className="nav-item" onClick={() => setMenuOpen(false)}>🏠 Home</NavLink>
          <NavLink to="/order" className="nav-item" onClick={() => setMenuOpen(false)}>📋 Orders</NavLink>
          <NavLink to="/dashboard" className="nav-item" onClick={() => setMenuOpen(false)}>▦ Dashboard</NavLink>
          <NavLink to="/card" className="cart-icon" onClick={() => setMenuOpen(false)}>🛒 Cart{cartItems?.length > 0 && (<span className="cart-count">{count}</span>)}</NavLink>

          {token ? (
            <>
              <NavLink to="/profile" className="user-icon" onClick={() => setMenuOpen(false)}><FiUser/></NavLink>
              <span className="logout-link">Logout</span>
            </>
          ) : (
            <>
              <NavLink to="/" className="login-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
            </>
          )}
        </div>
      </nav>
    <div className="header-line"></div>
    </>
  );
};

export default Header;


