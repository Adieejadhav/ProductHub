import React from 'react';
import '../stylings/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🛒 ProductHub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link> {/* ✅ Added Home link */}
        <Link to="/add">Add Item</Link>
        <Link to="/view">View Items</Link>
      </div>
    </nav>
  );
};

export default Navbar;
