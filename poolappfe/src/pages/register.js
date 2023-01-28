import React from 'react';

function RegisterPage(props) {
  function handleSubmit(event) {
    event.preventDefault();

    const { firstname, lastname, password, email } = event.target.elements;

    // Call the onRegister prop with the firstname, password, and email
    props.onRegister(firstname.value, lastname.value, email.value, password.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <label>
        First name
      
        <input type="text" name="firstname" />
      </label><br />
      <label>
        Last name
        <br />
        <input type="text" name="lastname" />
      </label><br />
      <label>
        Email
        <br />
        <input type="text" name="email" />
      </label><br />
      <label>
        Password
        <br />
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;