import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';


export const Add_M = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [inputAnimation, setInputAnimation] = useState(false);
  const[userSession,setusersession]=useState(sessionStorage.getItem('user'))
  const[isadmin,setisadmin]=useState(false)



  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const createNewMember = async () => {
    // Check if any of the input fields is empty
    if (!name || !city || !email) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    // Input validation checks
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert('Name should contain only English letters and spaces.');
      return;
    }
  
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(city)) {
      alert('City should contain only English letters and spaces.');
      return;
    }
  
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Save new member logic
    const addUrl = 'http://localhost:8000/members';
    const newMember = {
      name: name,
      city: city,
      email: email,
    };
  
    console.log(newMember);
  
    try {
      const response = await fetch(addUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  useEffect(() => {
    setInputAnimation(true);
  }, []);

  
  
  //second.........................................  
  useEffect(() => {
    const checkSession1 = async () => {
   
    const url = 'http://localhost:8000/sessionk';

      try {
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        console.log(data);
        if (!data || data === '') {
          alert('Server problem');
          window.location.href = '/login';
        } else if (!userSession || userSession === ''|| userSession===null) {
          alert('Session key is empty');
          window.location.href = '/login';
        } else {
          const obj={
            secretKeyToCompare : data.key,
            mysession: userSession

          }
          
          try {
            
            const newurl = 'http://localhost:8000/decoder';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log(data)
            if (data.isauto!==true) {
              alert('there is not match');
              window.location.href = '/login';
            }


            // Token is valid, continue with your logic...
          } catch (error) {
            alert('Session key is not correct');
            console.error(error);
            console.log("2 catch")
            window.location.href = '/login';
          }
        }
      } catch (error) {
        alert('Session key is not correct');
        console.log("1 catch")
        console.error(error);
        window.location.href = '/login';
      }
    };

    checkSession1();
  }, [userSession]);


    //third
//................................................






    useEffect(() => {
      const checkSession = async () => {
     
      const url = 'http://localhost:8000/sessionk';
    
        try {
          const resp = await fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await resp.json(); 
        if (data) {
          const obj={
            secretKeyToCompare : data.key,
            mysession: userSession
    
          }
          
          try {
            
            const newurl = 'http://localhost:8000/decoder/addmember';
            const resp = await fetch(newurl, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              
              body: JSON.stringify(obj)
            });
            const data = await resp.json();
            console.log("per")
            console.log(data)
            if (data!==true) {
              alert("you have no permission to be here")
              window.location.href = '/login';
         
            }
            else{
              setisadmin(true)
            }
    
          } catch (error) {
            console.log("arrive 65")
            console.error(error);
    
          }
    
    
        }
        }
          catch (error) {
            console.log("arrive 66")
            console.error(error);
    
          }}
          checkSession();
        }, [userSession]);





  return (
    <div>
      <br/><br/><br/><br/>
      {isadmin&&(
      <div>
    <div className="container body">
      <h2 className="title">Create New Member</h2>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="name" className="label">Name:</label>
        <div className="input-container">
          <input type="text" id="name" className="input" placeholder="Enter the name" onChange={handleNameChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="email" className="label">Email:</label>
        <div className="input-container">
          <input type="text" id="email" className="input" placeholder="Enter the email" onChange={handleEmailChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <div className={`form-group ${inputAnimation ? 'animated' : ''}`}>
        <label htmlFor="city" className="label">City:</label>
        <div className="input-container">
          <input type="text" id="city" className="input" placeholder="Enter the city" onChange={handleCityChange} />
          <div className="input-wave"></div>
        </div>
      </div>
      <button className="button" onClick={createNewMember}>Create New</button>
    </div>
    </div>)}
    </div>
  );
};

export default Add_M;
