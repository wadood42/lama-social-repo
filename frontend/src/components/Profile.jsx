import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../custom_hooks/useFetch";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import Feed from "./Feed";
import { AuthContext } from "../contexts/auth";
import { useParams } from "react-router";
import CreatePost from "./CreatePost";
import Post from "./Post";
import "../styles/Profile.css";
import axios from "axios";
import { format } from "timeago.js";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = ({ match }) => {
  const username = match.params.username;
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const { user, follow, unfollow } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const url = `/api/users/profile/${username}`;
  // const username = useParams().username;
  console.log("rendering profile", username);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(url);
        setCurrentUser(res.data.user);
        setPosts(res.data.posts);
        setLoading(false);
        console.log("res getting profile", res);
      } catch (err) {
        console.log("erro getting profile");
      }
    };

    getProfile();
  }, [url]);

  const handleFollow = async () => {
    const url = `/api/users/${currentUser._id}/follow`;

    const res = await axios.put(url, {
      userId: user.id,
    });

    console.log("res after following", res);
    follow(res.data.followedUserId);
  };

  const handleUnfollow = async () => {
    const url = `/api/users/${currentUser._id}/unfollow`;

    const res = await axios.put(url, {
      userId: user.id,
    });

    console.log("res after unfollow", res);

    unfollow(res.data.unfollowedUserId);
  };

  if (loading) {
    return (
      <div className='loading-spinner'>
        <ClipLoader />
      </div>
    );
  }

  const renderFollowBtn = () => {
    if (user.followings.includes(currentUser._id)) {
      return (
        <button className='follow-btn' onClick={handleUnfollow}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button className='follow-btn' onClick={handleFollow}>
          follow
        </button>
      );
    }
  };

  return (
    <div className='profile-container'>
      <div className='cover-picture'>
        <img src='/images/cover.jpeg' alt='cover ' />
      </div>
      <div className='profile-pic'>
        <img src='/images/avatar.jpeg' alt='profile pic' />
      </div>

      <div className='user-profile-details'>
        <p>{currentUser?.username} </p>
        <p>Joined {format(currentUser?.createdAt)}</p>

        {user.id !== currentUser._id ? renderFollowBtn() : ""}

        <p className='follower-counts'>
          Followers {currentUser?.followers.length}
        </p>
        <p className='following-counts'>
          Following {currentUser?.followings.length}
        </p>
      </div>
      {user.id === currentUser._id && <CreatePost />}

      {posts?.map((post) => (
        <Post post={post} setPosts={setPosts} key={post._id} />
      ))}
    </div>
  );
};

export default Profile;
