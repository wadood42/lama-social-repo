import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  const { login, user } = authContext;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/users/login", { email, password });
    console.log("res after loggin ", res);
    login(res.data);
  };

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <div className='login-left'>
          <h3 className='login-logo'>AfghanBook</h3>
          <span className='login-desc'>
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>

        <div className='login-right'>
          <form className='form-container login' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type='submit' value='Login' />
            <span className='forgot-password'>Forgot Password?</span>
            <Link to='/register' className='form-link'>
              Create new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
