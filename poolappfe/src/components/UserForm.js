import React, { useState } from 'react';
import { putUser } from '../services/auth';

const UserForm = ({ user }) => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [password, setPassword] = useState(user.password);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { firstname, lastname, password };
    await putUser(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          value={lastname}
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