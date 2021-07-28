import React from "react";
import "../styles/Post.css";
import { FaRegThumbsUp, FaRegHeart } from "react-icons/fa";
import { useFetch } from "../custom_hooks/useFetch";
const Post = ({ post }) => {
  // url to get a single user
  // let url = `api/users/${post.userId}`;

  // const { loading, error, data } = useFetch(url);

  return (
    <div className='single-post-container'>
      <li key={post.id} className='single-post'>
        <div className='user-details'>
          <img src='/images/avatar.jpeg' alt='' />
          {/* <h4>{post.user.username}</h4> */}
        </div>
        <div className='post-body'>
          <p>{post.desc}</p>
        </div>
        <div className='post-btns'>
          <span className='like-btn'>
            <FaRegThumbsUp />
          </span>
          <span className='heart-btn'>
            <FaRegHeart />
          </span>
        </div>
      </li>
    </div>
  );
};

export default Post;
