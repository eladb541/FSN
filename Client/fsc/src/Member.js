import React, { useState } from 'react';
import {Update_M} from './Update_M'; 
import './Member.css'; 

const Member = ({ member,updatevar, deletevar }) => {
  const [showO, setShowO] = useState(true);
  const [showup, setSup] = useState(false);

  if (!member) {
    return null; 
  }

  const open = () => {
    setShowO(!showO);
    setSup(!showup);
  };

  const change = () => { 
    setShowO(!showO);
    setSup(!showup);
  };


  const deleteM = async () => {
    const addUrl = 'http://localhost:8000/members';
    const params = {
        
        _id: member._id,
      };

    console.log(params);
    try {
      const response = await fetch(addUrl, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <div>
        <div className='member-container'>
      {showO && (
        <div>
      
          <h2>{member.name}</h2>
          <p>Email: {member.email}</p>
          <p>City: {member.city}</p>
        
       </div>
      )}


{updatevar ? (
          <button className="update-button" onClick={open}>
            Update
          </button>
        ) : null}

        {deletevar ? (
          <button className="delete-button" onClick={deleteM}>
            Delete
          </button>
        ) : null}



 </div>
      {showup && (
        <div>
          <Update_M member={member} onCancel={change} />
        </div>
      )}
    </div>
  );
};

export default Member;