import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../custom_hooks/useFetch";
import Post from "./Post";
import CreatePost from "./CreatePost";

import { AuthContext } from "../contexts/auth";

const Feed = ({ username }) => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const url = username
    ? `/api/users/profile/${username}`
    : `/api/posts/timeline/${user.id}`;

  const { loading, error, data } = useFetch(url);
  console.log("data from feed", data);

  console.log("rendering feed");

  if (loading) return <p>Loading...</p>;

  return (
    <div className='feed'>
      <CreatePost />
      <ul>
        {data.length > 0 ? (
          data.map((post) => <Post post={post} />)
        ) : (
          <p>No post found</p>
        )}
      </ul>
    </div>
  );
};

export default Feed;
