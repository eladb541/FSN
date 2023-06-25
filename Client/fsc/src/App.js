import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Movies } from './Movies'; // Update the import

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/movie" element={<Movies />} /> 
      </Routes>
    </div>
  );
}

export default App;
