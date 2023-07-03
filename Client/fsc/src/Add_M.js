import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';


export const Add_M = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [inputAnimation, setInputAnimation] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const createNewMember = async () => {
    const addUrl = 'http://localhost:8000/members';
    const newMember = {
      name: name,
      city: city,
      email: email,
    };

    console.log(newMember);

    try {
      const response = await fetch(addUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInputAnimation(true);
  }, []);

  return (
    <div className="container body">
      <h2 className="title">Create New Member</h2>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="name" className="label">Name:</label>
        <div className="input-container">
          <input type="text" id="name" className="input" placeholder="Enter the name" onChange={handleNameChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="email" className="label">Email:</label>
        <div className="input-container">
          <input type="text" id="email" className="input" placeholder="Enter the email" onChange={handleEmailChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="city" className="label">City:</label>
        <div className="input-container">
          <input type="text" id="city" className="input" placeholder="Enter the city" onChange={handleCityChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <button className="button" onClick={createNewMember}>Create New</button>
    </div>
  );
};

export default Add_M;
