import React, { useState } from 'react';
import { UpdateSub } from './UpdateSub';
import './Member.css';

const MySu = ({ subscribe  ,updatevar, deletevar}) => {
  const [showO, setShowO] = useState(true);
  const [showup, setSup] = useState(false);

  if (!subscribe) {
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
    const URL = 'http://localhost:8000/subscribes';
    const params = {
      _id: subscribe._id,
    };

    try {
      const response = await fetch(URL, {
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

  // Format the date as "dd/mm/yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <tr>
      <td>{subscribe.membername}</td>
      <td>{subscribe.memberid}</td>
      <td>{subscribe.moviename}</td>
      <td>{subscribe.movieid}</td>
      <td>{formatDate(subscribe.datemovie)}</td>
      {updatevar&&(
      <div>
      <td>
        {showO && (
          <button className="update-button" onClick={open}>
            Update
          </button>
        )}
      </td>
      </div>)}

      
      {deletevar&&(
      <div>
      <td>
        {showO && (
          <button className="delete-button" onClick={deleteM}>
            Delete
          </button>
        )}
      </td>
      </div>
)}

      <div>
      {showup && (
        <td colSpan="6">
          <UpdateSub subscribe={subscribe} onCancel={change} />
        </td>
      )}
      </div>



    </tr>
  );
};

export default MySu;
