import React from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css'; // Import the CSS file for Toolbar styles

const Toolbar = () => {
  const handleLogout = () => {
    alert('Goodbye');
  };

  return (
    <div className="toolbar-container">
      <nav className="toolbar">
        <Link className="toolbar-link" to="/movies">
          Movies
        </Link>
        <Link className="toolbar-link" to="/members">
          Members
        </Link>
        <Link className="toolbar-link" to="/subscribes">
          Subscribe
        </Link>
        <Link className="toolbar-link" to="/admin">
          Admin
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Toolbar;

