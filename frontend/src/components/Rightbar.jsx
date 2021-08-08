import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Rightbar = () => {
  console.log("rendering rightbar");
  const [usersToFollow, setUsersToFollow] = useState([]);

  useEffect(() => {
    const url = `/api/users/users-to-follow`;

    const getUsersToFollow = async () => {
      try {
        const res = await axios.get(url);
        console.log("users to follow", res);
        setUsersToFollow(res.data);
      } catch (err) {
        console.log("err geting users to follow");
      }
    };
    getUsersToFollow();
  }, []);

  return (
    <div className='rightbar'>
      <div className='users-to-follow'>
        {usersToFollow?.map((user) => (
          <Link to={`/profile/${user.username}`} key={user._id}>
            <div>{user.username}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
