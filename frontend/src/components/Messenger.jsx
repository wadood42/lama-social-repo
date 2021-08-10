import React, { useContext, useEffect, useState } from "react";
import "../styles/Messenger.css";
import Navbar from "./Navbar";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";

const Messenger = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);

  const [conversations, setConversations] = useState("");

  const url = `/api/conversations/${user.id}`;

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    const getConverstions = async () => {
      const res = await axios.get(url);
      setConversations(res.data);
    };
    getConverstions();
  }, [url]);

  return (
    <>
      <Navbar />
      <div className='messenger-container'>
        <div className='chatMenu'>
          <p>chat menu</p>
          <ul>
            {conversations &&
              conversations.map((conv) => (
                <li key={conv._id} onClick={() => setCurrentChat(conv)}>
                  <Conversation conversation={conv} currentUserId={user.id} />
                </li>
              ))}
          </ul>
        </div>

        <div className='chatBox'>
          <ChatBox currentChat={currentChat} />
        </div>

        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>onlines</div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
