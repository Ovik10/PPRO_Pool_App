import React, { useEffect, useState } from 'react';
import { putUser } from '../services/auth';

const UserForm = ({ user, onDeleteProfile, onUpdateUser }) => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [password, setPassword] = useState(user.password);
  const [toggle, setToggle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { firstname, lastname, password };
      var newUser = await putUser(updatedUser);
      newUser.data['token'] = user.token
      localStorage.setItem('user', JSON.stringify(newUser.data));
      await onUpdateUser();
      alert('Profile updated');
    } catch (error) {
      alert('An error occurred: '+error);
    }
  };
  const deleteMe = async (e) => {
    e.preventDefault();

    await onDeleteProfile();
  };
  const toggleVisibility = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Profile {user.email}</h1>
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
        <input type="checkbox" name="checkboxtoggle" onChange={toggleVisibility} checked={toggle}></input>

        Change password

      </label>
      <br />
      <br />
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