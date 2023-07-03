import React, { useState } from 'react';
import './Update_M.css';

export const Update_M = ({ member, onCancel }) => {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [city, setCity] = useState(member.city);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const updateM = () => {
    onCancel();
  };

  const updatemember = async () => {
    const addUrl = 'http://localhost:8000/members';
    const newMember = {
      name: name,
      city: city,
      email: email,
    };

    const params = {
        obj: newMember,
        _id: member._id
      };

    console.log(newMember);
    console.log(params);
    try {
      const response = await fetch(addUrl, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    onCancel();
  };



  return (
    <div className="update-container">
      <div className="label-input">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div className="label-input">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="label-input">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" value={city} onChange={handleCityChange} />
      </div>

      <button className="update-button" onClick={updatemember} >Change</button>
      <br/>
      <button className="delete-button" onClick={updateM}>Cancel</button>
    </div>
  );
};

export default Update_M;
