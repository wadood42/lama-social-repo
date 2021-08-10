import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/auth";

const Signup = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    setUserData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/users/register", userData);
    console.log("res after registering", res.data);
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
          <form className='form-container signup' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Username'
              value={userData.username}
              name='username'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              value={userData.email}
              onChange={handleChange}
              name='email'
            />
            <input
              type='password'
              placeholder='Password'
              value={userData.password}
              onChange={handleChange}
              name='password'
            />
            <input
              type='password'
              placeholder='Password again'
              value={userData.confirmedPassword}
              onChange={handleChange}
              name='confirmedPassword'
            />
            <input type='submit' value='Signup' />
            <Link to='/' className='form-link'>
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
