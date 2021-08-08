import React, { useContext, useState } from "react";
import {
  BsFillPersonFill,
  BsFillChatQuoteFill,
  BsBellFill,
  BsSearch,
} from "react-icons/bs";

import { AuthContext } from "../contexts/auth";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "../styles/Navbar.css";
import axios from "axios";
import useUserSearch from "./useUserSearch";
const Navbar = () => {
  console.log("rendering navbar");

  const authContext = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, loading, setData, error } = useUserSearch(query);

  const [suggestedUsers, setSuggestedUsers] = useState(false);

  console.log(data);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSuggestedUsers(true);
  };

  const { user, logout } = authContext;
  return (
    <>
      <div className='nav-container'>
        <ul className='links'>
          <li className='home-logo'>
            <Link to='/'>
              <h1>AfghanBook</h1>
            </Link>
          </li>
          <li className='search'>
            <BsSearch size={16} />
            <input
              type='search'
              placeholder='Search...'
              onChange={handleChange}
            />
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
      {suggestedUsers && (
        <div className='found-users'>
          <ul>
            {loading && <p>Loading</p>}
            {error && <p>{error.msg}</p>}
            {data?.map((foundUser) => (
              <li key={foundUser._id}>
                <Link to={`/profile/${foundUser.username}`}>
                  <p>{foundUser.username}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
