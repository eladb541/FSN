import React, { useState } from 'react';

const AddUserPage = () => {
  const [username, setUsername] = useState('');
  const [sessionTO, setSessionTO] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Permissions state
  const [creatM, setCreatM] = useState(false);
  const [viewM, setViewM] = useState(false);
  const [updateM, setUpdateM] = useState(false);
  const [deleteM, setDeleteM] = useState(false);
  const [subV, setSubV] = useState(false);
  const [subC, setSubC] = useState(false);
  const [subU, setSubU] = useState(false);
  const [subD, setSubD] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [creatMo, setCreatMo] = useState(false);
  const [viewMo, setViewMo] = useState(false);
  const [updateMo, setUpdateMo] = useState(false);
  const [deleteMo, setDeleteMo] = useState(false);


  const adduser = async (event) => {
    event.preventDefault()
    const addUrl = 'http://localhost:8000/checkd'; // Update the URL
    const posturl='http://localhost:8000/admin';
    const params = {
      username: username,
    };
  
    try {
      const response = await fetch(addUrl, {
        method: 'post', // Update the HTTP method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params), // Pass the params directly
      });
      const data = await response.json();
      if (data) {
        alert("the username is already used by other user")
      }
      else{
       
        const userDb = {
          username: username,
          password:"",
          sessionTO:sessionTO,
          email:email,
          CreatedAt:new Date()
        };


        const namejson ={
          id:"",
          name:name
        }

        const permissionsjson ={
          id:"",
          "permissions": {
          creatM: creatM,
          viewM: viewM,
          updateM: updateM,
          deleteM: deleteM,
          subV: subV,
          subC: subC,
          subU: subU,
          subD: subD,
          creatMo: creatMo,
          viewMo: viewMo,
          updateMo: updateMo,
          deleteMo: deleteMo,
          Admin: admin
          }
        }
        const alluser ={
          db:userDb,
          allname:namejson,
          allpermmision:permissionsjson
        }
        try {
          const response = await fetch(posturl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alluser),
          });
          
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };



      }           
     catch (error) {
      console.error(error);
    }
  };
  



  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={adduser}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Session Timeout:</label>
          <input type="text" value={sessionTO} onChange={(e) => setSessionTO(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Permissions:</label>
          <div>
            <input type="checkbox" checked={creatM} onChange={(e) => setCreatM(e.target.checked)} />
            <label>creatM</label>
          </div>
          <div>
            <input type="checkbox" checked={viewM} onChange={(e) => setViewM(e.target.checked)} />
            <label>viewM</label>
          </div>
          <div>
            <input type="checkbox" checked={updateM} onChange={(e) => setUpdateM(e.target.checked)} />
            <label>updateM</label>
          </div>
          <div>
            <input type="checkbox" checked={deleteM} onChange={(e) => setDeleteM(e.target.checked)} />
            <label>deleteM</label>
          </div>
          <div>
            <input type="checkbox" checked={subV} onChange={(e) => setSubV(e.target.checked)} />
            <label>subV</label>
          </div>
          <div>
            <input type="checkbox" checked={subC} onChange={(e) => setSubC(e.target.checked)} />
            <label>subC</label>
          </div>
          <div>
            <input type="checkbox" checked={subU} onChange={(e) => setSubU(e.target.checked)} />
            <label>subU</label>
          </div>
          <div>
            <input type="checkbox" checked={subD} onChange={(e) => setSubD(e.target.checked)} />
            <label>subD</label>
          </div>
          <div>
            <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
            <label>Admin</label>
          </div>
          <div>
            <input type="checkbox" checked={creatMo} onChange={(e) => setCreatMo(e.target.checked)} />
            <label>creatMo</label>
          </div>
          <div>
            <input type="checkbox" checked={viewMo} onChange={(e) => setViewMo(e.target.checked)} />
            <label>viewMo</label>
          </div>
          <div>
            <input type="checkbox" checked={updateMo} onChange={(e) => setUpdateMo(e.target.checked)} />
            <label>updateMo</label>
          </div>
          <div>
            <input type="checkbox" checked={deleteMo} onChange={(e) => setDeleteMo(e.target.checked)} />
            <label>deleteMo</label>
          </div>
        </div>
        <button type="submit">Add User</button>
     </form>
    </div>
  );
};

export default AddUserPage;
