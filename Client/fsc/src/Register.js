import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const url = 'http://localhost:8000/register';

  async function login() {

    const logindata = {
      username: username,
      password: password,
    };

    try {
      const resp = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logindata),
      });
      const data = await resp.json();
      console.log(data)
     alert(data.msg)
      
      
    } catch (error) {
      console.error(error);
    }




  }

  return (
    <div>
     <br />
     <br />
     <br />
      <br />
      Username: <input type='text' onChange={(e) => setUsername(e.target.value)} />
      <br />
      Password: <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={() => login()}>register</button>




      <br/>
<br/>
<div>
have already an account?
      <Link to="/login">
        <button>login</button>
      </Link>
    </div>


    </div>
  );
};
export default Register;