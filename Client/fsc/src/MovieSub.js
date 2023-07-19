import React, { useState, useEffect } from 'react';

export const MovieSub = ({ mysubscribe }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleMovieClick = () => {
    window.location.href = '/members';
   
  };

  const memberContainerStyle = {
    border: '2px solid purple',
    padding: '10px',
  };

  return (
    <div style={memberContainerStyle}>
      <h2>subscribes</h2>
      {mysubscribe.map((sub) => (
        <div key={sub._id}>

          <p>Date: {formatDate(sub.datemovie)}</p>
          <div onClick={handleMovieClick}>
            member: {sub.membername}
          </div>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default MovieSub;
