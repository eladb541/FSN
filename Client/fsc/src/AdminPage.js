import React, { useState, useEffect } from 'react';
import User from './User';
import './Adminpage.css';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [allusers, setallusers] = useState([]);
  const [showusers, setshowusers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8000/admin';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setallusers(data); // Update the state with the fetched data
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8000/admin';
      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        setallusers(data); // Update the state with the fetched data
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [allusers]);






  useEffect(() => {
    setshowusers(allusers);
  }, [allusers]);

  useEffect(() => {
    const subset = allusers.map((user) => {
      const formattedDate = formatDate(user.CreatedAt); // Format the date
      const { username, password, sessionTO, email, name, permissions, _id } = user;
      return {
        _id,
        username,
        password,
        sessionTO,
        CreatedAt: formattedDate,
        email,
        name,
        permissions,
      };
    });
    setshowusers(subset);
  }, [allusers]);

  useEffect(() => {
    if (search !== '') {
      const filteredUsers = allusers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      const subset = filteredUsers.map((user) => {
        const formattedDate = formatDate(user.CreatedAt); // Format the date
        const { username, password, sessionTO, email, name, permissions, _id } = user;
        return {
          _id,
          username,
          password,
          sessionTO,
          CreatedAt: formattedDate,
          email,
          name,
          permissions,
        };
      });
      setshowusers(subset);
    } else {
      const subset = allusers.map((user) => {
        const formattedDate = formatDate(user.CreatedAt); // Format the date
        const { username, password, sessionTO, email, name, permissions, _id } = user;
        return {
          _id,
          username,
          password,
          sessionTO,
          CreatedAt: formattedDate,
          email,
          name,
          permissions,
        };
      });
      setshowusers(subset);
    }
  }, [search, allusers]);

  // Function to format date as "dd/mm/yyyy"
  const formatDate = (dateString) => {
    if (!dateString) {
      return ''; // Return empty string for null or empty date strings
    }
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Pad single digits with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <div className="admin-page">
      <br />
      <br />
      <h1>AdminPage</h1>
      <div className="fixed-container">
        <input
          type="text"
          className="fixed-search"
          placeholder="Search by Name, username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="users-container">
        {showusers.map((user) => (
          <User key={user._id} user={user} />
        ))}
      
      </div>
      <div>
        <Link to="/adduser">
          <button className="add-member-button">Add New Member</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
