import React, { useState } from 'react';
import PermissionUpdatePage from './UserUpPer';

const User = ({ user }) => {
  const [showAll, setShowAll] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);

  const changeShow = () => {
    setShowAll(!showAll);
    setShowUpdate(!showUpdate);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteuser = async () => {
    const addUrl = 'http://localhost:8000/admin';
    const params = {
      _id: user._id,
    };

    console.log(params);
    try {
      const response = await fetch(addUrl, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      console.log('response', response);
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showAll && (
        <div className="member-container">
          <div>
            <h2>User: {user.username}</h2>
            <p>Session Timeout: {user.sessionTO}</p>
            <p>Created At: {user.CreatedAt}</p>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Permissions:</p>
            <ul>
              <li>creatM: {user.permissions?.creatM?.toString()}</li>
              <li>viewM: {user.permissions?.viewM?.toString()}</li>
              <li>updateM: {user.permissions?.updateM?.toString()}</li>
              <li>deleteM: {user.permissions?.deleteM?.toString()}</li>
              <li>subV: {user.permissions?.subV?.toString()}</li>
              <li>subC: {user.permissions?.subC?.toString()}</li>
              <li>subU: {user.permissions?.subU?.toString()}</li>
              <li>subD: {user.permissions?.subD?.toString()}</li>
              <li>Admin: {user.permissions?.Admin?.toString()}</li>
              <li>creatMo: {user.permissions?.creatMo?.toString()}</li>
              <li>viewMo: {user.permissions?.viewMo?.toString()}</li>
              <li>updateMo: {user.permissions?.updateMo?.toString()}</li>
              <li>deleteMo: {user.permissions?.deleteMo?.toString()}</li>
            </ul>
          </div>
          <button className="update-button" onClick={changeShow}>
            Update Permissions
          </button>
          <button className="delete-button" onClick={deleteuser}>
            Delete
          </button>
        </div>
      )}

      {showUpdate && (
        <PermissionUpdatePage user={user} cancel={changeShow} />
      )}
    </div>
  );
};

export default User;
