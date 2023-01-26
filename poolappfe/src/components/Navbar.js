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
      {user ? (
        <>
          <Link to="/courses">Courses</Link>
          <Link to="/courses/add">Add course</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      <br /><br />
    </nav>
  );
};

export default Navbar;
