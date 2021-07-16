import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email">
          Email
          <input id="email" name="email" type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" />
        </label>

        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
