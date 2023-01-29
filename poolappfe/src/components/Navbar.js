import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    user = getCurrentUser();
    setIsAdmin(false)
    if (user && user.role == "ADMIN") {
      setIsAdmin(true);
    }
  });

  return (
    <nav className={isAdmin ? 'admin' : null}>
      <Link to="/" className='logo'>&#126; Pool app &#126;</Link>
      {user ? (
        <>
          <div>
            <Link to="/courses"> Courses</Link>
            {isAdmin ? (
              <Link to="/courses/add">+ Add course</Link>
            ) : (
              <Link to="/add_credits">Add credits ({user.credits})</Link>
            )}
            <Link to="/user">Edit profile</Link>
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
