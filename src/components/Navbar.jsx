import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1><Link to="/">React Movie App</Link></h1>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">My Favorites ❤️</Link>
      </div>
    </nav>
  );
};

export default Navbar;