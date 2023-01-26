import React, { useState } from 'react';
import { updateUser } from '../services/auth';

const UserForm = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { firstName, lastName, password };
    await updateUser(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserForm;