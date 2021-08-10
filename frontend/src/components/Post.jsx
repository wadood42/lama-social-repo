import React, { useContext, useState, useEffect } from "react";
import "../styles/Post.css";
import {
  FaRegThumbsUp,
  FaRegHeart,
  FaThumbsDown,
  FaTrash,
} from "react-icons/fa";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useFetch } from "../custom_hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../contexts/auth";
const Post = ({ post, setPosts }) => {
  const [postUser, setPostUser] = useState(null);

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await axios.get(`/api/users/${post.userId}`);
        console.log("res gettiing post user", res);
        setPostUser(res.data);
      } catch (err) {
        console.log("err gettting a user", err);
      }
    };

    getPostUser();
  }, [post]);
  const { user } = useContext(AuthContext);

  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.id));

  const likePost = async () => {
    try {
      const res = axios.put(`/api/posts/${post._id}/like`, {
        userId: user.id,
      });
      if (isLiked) {
        setLikesCount((likesCount) => likesCount - 1);
        setIsLiked(false);
      } else {
        setLikesCount((likesCount) => likesCount + 1);
        setIsLiked(true);
      }
    } catch (err) {
      console.log("err form liking", err);
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`/api/posts/${post._id}`, {
        data: { userId: user.id },
      });

      console.log("deleting", res.data._id);
      setPosts((posts) => posts.filter((p) => p._id !== res.data._id));
    } catch (err) {
      console.log("error deleteing post", err);
    }
  };

  return (
    <div className='single-post-container'>
      <li key={post.id} className='single-post'>
        <div className='user-details'>
          <img src='/images/avatar.jpeg' alt='' />
          <Link to={`/profile/${postUser?.user.username}`}>
            <h4>{postUser?.user.username}</h4>
          </Link>
        </div>
        <div className='post-body'>
          <p>{post.desc}</p>
        </div>
        <div className='post-btns'>
          {isLiked ? (
            <span className='like-btn' onClick={likePost}>
              <FaThumbsDown />
            </span>
          ) : (
            <span className='like-btn' onClick={likePost}>
              <FaRegThumbsUp />
            </span>
          )}
          <p className='like-counts'>{likesCount} people liked</p>

          {post.userId === user.id && (
            <span className='delete-btn' onClick={deletePost}>
              <FaTrash size={18} />
            </span>
          )}
          <p className='post-time'>{format(post.createdAt)}</p>
        </div>
      </li>
    </div>
  );
};

export default Post;
