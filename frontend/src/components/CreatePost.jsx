import React, { useState, useContext } from "react";
import { FaPhotoVideo, FaSmileWink, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/CreatePost.css";
import axios from "axios";
import { AuthContext } from "../contexts/auth";

const CreatePost = ({ setPosts }) => {
  const { user } = useContext(AuthContext);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/posts", {
        desc: postText,
        userId: user.id,
      });

      console.log("res after sharing post", res.data);
      setPosts((posts) => [res.data, ...posts]);
      setPostText("");
    } catch (err) {
      console.log("err after sharing post");
    }
  };
  return (
    <div className='create-post-container'>
      <div className='post-form'>
        <form onSubmit={handleSubmit}>
          <div className='profile-image-post-text'>
            <img src='/images/avatar.jpeg' alt='' />
            <input
              className='post-text'
              type='text'
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>

          <div className='photo-video'>
            <label htmlFor='fileUpload'>
              <FaPhotoVideo
                size={20}
                style={{
                  padding: "2px",
                  color: "red",
                }}
              />
              <span
                style={{
                  padding: "2px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}>
                Photo/Video
              </span>
            </label>
            <input type='file' className='file' id='fileUpload' />
            <div className='feeling'>
              <FaSmileWink
                size={24}
                style={{
                  color: "red",

                  padding: "6px",
                  cursor: "pointer",
                }}
              />
              <span>Feeling</span>
            </div>

            <div className='location'>
              <FaMapMarkerAlt
                size={24}
                style={{
                  color: "red",

                  padding: "6px",
                  cursor: "pointer",
                }}
              />
              <span>Loaction</span>
            </div>
            <input type='submit' value='Share' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
