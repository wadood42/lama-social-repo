import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import "../styles/Messenger.css";
import { AuthContext } from "../contexts/auth";
import Message from "./Message";
const ChatBox = ({ currentChat }) => {
  const scrollRef = useRef();

  console.log("rendering chatbox");

  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentChat === null) return;
    const url = `/api/messages/${currentChat._id}`;

    const getMessages = async () => {
      try {
        const res = await axios.get(url);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  const sendMessage = async () => {
    console.log(newMessage);

    const newMsg = {
      conversationId: currentChat._id,
      sender: user.id,
      text: newMessage,
    };

    const res = await axios.post("/api/messages", newMsg);

    setMessages([...messages, res.data]);
    console.log("new msg res", res);

    setNewMessage("");
  };

  useEffect(() => {
    console.log("scroll ref", scrollRef);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleScroll = () => {
    console.log("scrolling....");
  };

  return (
    <div className='messages-container'>
      {messages === null && (
        <p className='start-conversation'>Please start a conversation </p>
      )}

      {messages && (
        <div className='messages-wrapper'>
          <div className='messages-list' onScroll={handleScroll}>
            {messages.map((msg) => (
              <div
                ref={scrollRef}
                className={
                  msg.sender === user.id
                    ? "single-message own"
                    : "single-message"
                }>
                <Message message={msg} key={msg._id} />
              </div>
            ))}
          </div>

          <div className='new-message'>
            <textarea
              placeholder='new message'
              value={newMessage}
              required
              onChange={(e) => setNewMessage(e.target.value)}></textarea>
            <button className='send-btn' onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
