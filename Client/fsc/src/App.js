import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Movies } from './Movies'; 
import { AddMovie } from './AddMovie'; 
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/movies" element={<Movies />} /> 
        <Route exact path="/addmovie" element={<AddMovie />} /> 
      </Routes>
    </div>
  );
}

export default App;
