import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
