import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Movies } from './Movies';
import { Addmovie } from './AddMovie';
import { Members } from './Members';
import { Add_M } from './Add_M';
import { MySubscribes } from './MySus';
import { AddSubscribe } from './AddSubscribes';
import AdminPage from './AdminPage';
import AddUserPage from './Add_User';
import Toolbar from './ToolBar';
import Register from './Register';


function App() {
  return (
    <div className="App">
      <Toolbar />
      <div className='mybody'>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/addmovie" element={<Addmovie />} />
          <Route exact path="/members" element={<Members />} />
          {/* */}
          <Route exact path="/addmember" element={<Add_M />} />
          <Route exact path="/subscribes" element={<MySubscribes />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/addsubscribe" element={<AddSubscribe />} />
          <Route exact path="/adduser" element={<AddUserPage />} />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
