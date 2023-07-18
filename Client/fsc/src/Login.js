import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[names,setnames]=useState("")

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
       
        // Now, fetch the name
        const urlmy = 'http://localhost:8000/sessionk';

        try {
          const resp = await fetch(urlmy, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await resp.json();
          const obj = {
            secretKeyToCompare: data.key,
            mysession: sessionStorage.getItem('user'), // Get the userSession from sessionStorage
          };
          console.log(obj);
          try {
            const newurl = 'http://localhost:8000/decoder/namecoded';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(obj),
            });
            const data = await resp.json();
            if (data.username !== null) {
              // Set the name in sessionStorage with the name 'name'
              sessionStorage.setItem('name', data.username);
              setnames(data.username)
            
            }
          } catch (error) {
            console.error("catch2");
          }
        } catch (error) {
          console.error("catch3");
        }
        
        alert(data.msg);
        console.log("succeed")
     
        
      } else {
        alert(data.msg);
      }
    } catch (error) {
      alert("error");
      console.log(error);
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
