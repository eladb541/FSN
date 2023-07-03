import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Movies } from './Movies'; 
import { Addmovie } from './AddMovie'; 
import { Members } from './Members'; 

import { Add_M } from './Add_M'; 

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() { 
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/movies" element={<Movies />} /> 
        <Route exact path="/addmovie" element={<Addmovie />} /> 
        <Route exact path="/members" element={<Members />} /> 
        {/* */}
        <Route exact path="/addmember" element={< Add_M/>} /> 
      </Routes>
    </div>
  );
}

export default App;
