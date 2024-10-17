import React from 'react';
import './LoginRegister.scss'; // Assuming SCSS for styling

const LoginRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-section register">
        <h2>Register</h2>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="email" placeholder="verify email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="verify password" />
        <button>Sign Up</button>
      </div>
      <div className="auth-section login">
        <h2>Login</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <div className="checkbox-container">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">remember me</label>
        </div>
        <button>Sign In</button>
        <a href="#">forgot password?</a>
      </div>
    </div>
  );
};

export default LoginRegister;
