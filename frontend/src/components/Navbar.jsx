import React, { useContext } from "react";
import {
  BsFillPersonFill,
  BsFillChatQuoteFill,
  BsBellFill,
  BsSearch,
} from "react-icons/bs";
import { AuthContext } from "../contexts/auth";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "../styles/Navbar.css";
const Navbar = () => {
  const authContext = useContext(AuthContext);

  console.log("rendering navbar");

  const { user, logout } = authContext;
  return (
    <div className='nav-container'>
      <ul className='links'>
        <li className='home-logo'>
          <Link to='/'>
            <h1>AfghanBook</h1>
          </Link>
        </li>
        <li className='search'>
          <BsSearch size={16} />
          <input type='search' placeholder='Search...' />
        </li>
        <li className='homepage'>
          <Link to='/'>Homepage</Link>
        </li>

        <li className='timeline'>
          <Link>Timeline</Link>
        </li>

        <ul className='profile-links'>
          <li className='profile'>
            <Link to={`/profile/${user.username}`}>
              <BsFillPersonFill size={22} />
            </Link>
          </li>
          <li className='messages'>
            <Link to='/messenger'>
              <BsFillChatQuoteFill size={22} />
            </Link>
          </li>
          <li className='notifications'>
            <Link>
              <BsBellFill size={22} />
            </Link>
          </li>
          <li>
            <Link>{user.username}</Link>
          </li>
          <li>
            <button onClick={() => logout()}>Logou</button>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;
