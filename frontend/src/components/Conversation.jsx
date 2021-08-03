import React, { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUserId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${friendId}`);

        setUser(res.data.user);
      } catch (err) {
        console.log("error getting user");
      }
    };

    getUser();
  }, [currentUserId, conversation]);

  console.log("user", user);

  return (
    <>
      <img
        src={
          user && user.profilePicture
            ? user.profilePicture
            : "/images/avatar.jpeg"
        }
        alt='profile pitcture'
      />
      <p>{user && user.username}</p>
    </>
  );
};

export default Conversation;
