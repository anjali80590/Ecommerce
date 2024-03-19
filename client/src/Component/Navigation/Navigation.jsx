import React from "react";
import "./Navigation.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Cart from '../../images/Cart.png';
import Search from '../../images/Search.png';

function Navigation() {
  return (
    <div>
      <div className="user-info-and-help">
        <a href="/help" className="help-link">
          Help
        </a>
        <a href="/orders" className="orders-link">
          Orders & Returns
        </a>
        <span className="user-info">Hi, John</span>
      </div>
      <nav className="navbar">
        <div className="logo">ECOMMERCE</div>
        <div className="nav-links">
          <a href="/categories">Categories</a>
          <a href="/sale">Sale</a>
          <a href="/clearance">Clearance</a>
          <a href="/new">New stock</a>
          <a href="/trending">Trending</a>
        </div>
        <div className="nav-icons">
        <img src={Search} alt="Search" className="icon search-icon" />
       <img src={Cart} alt="Cart" className="icon cart-icon" />
         

        </div>
      </nav>
      <div className="promo-banner">
        <span className="arrow-left">&lt;</span>
        <span className="promo-text">Get 10% off on business sign up</span>
        <span className="arrow-right">&gt;</span>
      </div>
    </div>
  );
}

export default Navigation;
