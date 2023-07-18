import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  const [userSession, setusersession] = useState(sessionStorage.getItem('user'));
  const [myname, setmyname] = useState("guest");

  useEffect(() => {
    const checkSession = async () => {
      const url = 'http://localhost:8000/sessionk';

      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        const obj = {
          secretKeyToCompare: data.key,
          mysession: userSession
        };

        try {
          const newurl = 'http://localhost:8000/namecoded';
          const resp = await fetch(newurl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
          });
          const data = await resp.json();
          if (data.username !== null) {
            setmyname(data.username);
          }
        } catch (error) {
          console.error(error);
        }

      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, [userSession]);

  const handleLogout = async () => {
    alert("goodbye");
    sessionStorage.setItem('user', null);
    window.location.href = '/login';
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
        <br />
        <br />
        hello {myname}
      </nav>
    </div>
  );
};

export default Toolbar;
