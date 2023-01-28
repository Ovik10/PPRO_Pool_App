import React, { useEffect, useState } from 'react';
import { deleteUser, putUser } from '../services/auth';

const UserForm = ({ user }) => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [password, setPassword] = useState(user.password);
  const [toggle, setToggle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { firstname, lastname, password };
    await putUser(updatedUser);
  };
  const deleteMe = async (e) => {
    await deleteUser(user.id);
  };
  const toggleVisibility = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Profile</h1>
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
        Last Name
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label>
      <input type="checkbox" name="checkboxtoggle" onClick={toggleVisibility} checked={toggle}></input>
      
      Change password
      
      </label>
      <br/>
      <br/>
      {
        toggle ? (
        
          <label>
            Password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          
        ) : ('')
      }
      
      <br />

      <button type="submit">Update Profile</button>
      <button className="danger" onClick={deleteMe}>Delete Profile</button>
    </form>
  );
};

export default UserForm;