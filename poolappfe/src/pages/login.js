import React from 'react';

function LoginPage(props) {
  function handleSubmit(event) {
    event.preventDefault();
    // Get the email and password values from the form
    const { email, password } = event.target.elements;

    // Call the onLogin prop with the email and password
    props.onLogin(email.value, password.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Email
        <input type="text" name="email" />
      </label>
      <br/>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <br/>

      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;