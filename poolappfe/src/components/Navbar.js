import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <nav>
      <Link to="/" className='logo'>&#126; Pool app &#126;</Link>
      {user ? (
        <>
        <div>
          <Link to="/courses"> Courses</Link>
          <Link to="/courses/add">+ Add course</Link>
        </div>
        <div>
          <Link to="/user">Edit profile</Link>
          <Link to="/add_credits">Add credits</Link>
          <button onClick={handleLogout}>Logout &#187;</button>
          </div>
        </>
      ) : (
        <>
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
