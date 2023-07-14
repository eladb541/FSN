import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  const handleLogout = () => {
    alert('Goodbye');
  };

  const location = useLocation(); // Get the current location

  return (
    <div className="toolbar-container">
      <nav className="toolbar">
        <Link
          className={`toolbar-link ${location.pathname === '/movies' ? 'active' : ''}`}
          to="/movies"
        >
          Movies
        </Link>
        <Link
          className={`toolbar-link ${location.pathname === '/members' ? 'active' : ''}`}
          to="/members"
        >
          Members
        </Link>
        <Link
          className={`toolbar-link ${location.pathname === '/subscribes' ? 'active' : ''}`}
          to="/subscribes"
        >
          Subscribes
        </Link>
        <Link
          className={`toolbar-link ${location.pathname === '/admin' ? 'active' : ''}`}
          to="/admin"
        >
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
