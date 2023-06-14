import React from 'react';
import { useState } from 'react';

export const Login = () => {
  const [username, setusername] = useState([]);
  const [password, setpassword] = useState([]);

  const url = 'http://localhost:3000/login';
  async function login() {
    const logindata = {
      username: username,
      password: password,
    };

    const resp = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logindata),
    });
    const data = await resp.json();
    sessionStorage['accessToken'] = data;
    alert(sessionStorage);
  }

  return (
    <div>
      <h1>login</h1>
      <br />
      username: <input type='text' onChange={(e) => setusername(e.target.value)} />
      <br />
      password: <input type='password' onChange={(e) => setpassword(e.target.value)} />
      <br />
      <button onClick={() => login()}>login</button>
    </div>
  );
};
