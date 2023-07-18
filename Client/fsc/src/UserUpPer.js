import React, { useState } from 'react';

const PermissionUpdatePage = ({ user, cancel }) => {
  const [permissions, setPermissions] = useState(user.permissions);

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };

  const onCancel = () => {
    cancel();
  };

  const handleSubmit = async () => {
    const updateUrl =  'http://localhost:8000/admin';
    const params = {
      _id: user._id,
      obj: permissions,
    };

    try {
      const response = await fetch(updateUrl, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      console.log( data);
    } catch (error) {
      console.error(error);
    }
    onCancel()
  };

  return (
    <div className="permission-update-page">
      <h2>User: {user.username}</h2>

      <h3>Permissions:</h3>
      <ul>
        <li>
          creatM:{' '}
          <input
            type="checkbox"
            checked={permissions.creatM}
            onChange={() => handlePermissionChange('creatM')}
          />
        </li>
        <li>
          viewM:{' '}
          <input
            type="checkbox"
            checked={permissions.viewM}
            onChange={() => handlePermissionChange('viewM')}
          />
        </li>
        <li>
          updateM:{' '}
          <input
            type="checkbox"
            checked={permissions.updateM}
            onChange={() => handlePermissionChange('updateM')}
          />
        </li>
        <li>
          deleteM:{' '}
          <input
            type="checkbox"
            checked={permissions.deleteM}
            onChange={() => handlePermissionChange('deleteM')}
          />
        </li>
        <li>
          subV:{' '}
          <input
            type="checkbox"
            checked={permissions.subV}
            onChange={() => handlePermissionChange('subV')}
          />
        </li>
        <li>
          subC:{' '}
          <input
            type="checkbox"
            checked={permissions.subC}
            onChange={() => handlePermissionChange('subC')}
          />
        </li>
        <li>
          subU:{' '}
          <input
            type="checkbox"
            checked={permissions.subU}
            onChange={() => handlePermissionChange('subU')}
          />
        </li>
        <li>
          subD:{' '}
          <input
            type="checkbox"
            checked={permissions.subD}
            onChange={() => handlePermissionChange('subD')}
          />
        </li>
        <li>
          Admin:{' '}
          <input
            type="checkbox"
            checked={permissions.Admin}
            onChange={() => handlePermissionChange('Admin')}
          />
        </li>
        <li>
          creatMo:{' '}
          <input
            type="checkbox"
            checked={permissions.creatMo}
            onChange={() => handlePermissionChange('creatMo')}
          />
        </li>
        <li>
          viewMo:{' '}
          <input
            type="checkbox"
            checked={permissions.viewMo}
            onChange={() => handlePermissionChange('viewMo')}
          />
        </li>
        <li>
          updateMo:{' '}
          <input
            type="checkbox"
            checked={permissions.updateMo}
            onChange={() => handlePermissionChange('updateMo')}
          />
        </li>
        <li>
          deleteMo:{' '}
          <input
            type="checkbox"
            checked={permissions.deleteMo}
            onChange={() => handlePermissionChange('deleteMo')}
          />
        </li>
      </ul>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      <button onClick={onCancel}>
        Back to User
      </button>
    </div>
  );
};

export default PermissionUpdatePage;
