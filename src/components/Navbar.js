import React from 'react';
import { Link } from 'react-router-dom'; // Imports Link component for client-side navigation
import '../style/Navbar.css'; 

// Stateless Functional Component: Renders the static navigation bar.
// This component focuses solely on the UI and does not manage any internal state.
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>React Movie App</h1>
      </div>
      
      <div className="navbar-links">
        {/* Using <Link> instead of standard HTML <a> tags is crucial here.
           It allows the application to navigate between routes without triggering 
           a full page reload, preserving the Single Page Application (SPA) behavior.
        */}
        <Link to="/">Home</Link>
        <Link to="/favorites">My Favorites ❤️</Link>
      </div>
    </nav>
  );
};

export default Navbar;