import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../custom_hooks/useFetch";
import Post from "./Post";
import CreatePost from "./CreatePost";
import axios from "axios";
import { AuthContext } from "../contexts/auth";
import ClipLoader from "react-spinners/ClipLoader";

const Feed = ({ username }) => {
  const authContext = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = authContext;

  const url = username
    ? `/api/users/profile/${username}`
    : `/api/posts/timeline/${user.id}`;

  // const { loading, error, data } = useFetch(url);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(url);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.log("err getting all posts", err);
        setLoading(false);
      }
    };

    getAllPosts();
  }, [url]);

  console.log("rendering feed");

  return (
    <div className='feed'>
      <CreatePost setPosts={setPosts} />

      {loading && (
        <div className='loading-spinner'>
          <ClipLoader color='green' />
        </div>
      )}
      <ul>
        {posts ? (
          posts?.map((post) => (
            <Post post={post} setPosts={setPosts} key={post._id} />
          ))
        ) : (
          <p>NO POSTS YET</p>
        )}
      </ul>
    </div>
  );
};

export default Feed;
