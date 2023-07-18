import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const url = 'http://localhost:8000/login';

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
      if (data && data.token) {
        // Set the token in sessionStorage with the name 'user'
        sessionStorage.setItem('user', data.token);
        alert(data.msg)
      }
      else{
        alert(data.msg)
      }
      
    } catch (error) {
      alert("error");
      console.log(error)
    }




  }

  return (
    <div>
      <h1>Login</h1>
      <br />
      Username: <input type='text' onChange={(e) => setUsername(e.target.value)} />
      <br />
      Password: <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={() => login()}>Login</button>
    </div>
  );
};
export default Login;