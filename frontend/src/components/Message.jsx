import React from "react";
import { format } from "timeago.js";

const Message = ({ message }) => {
  return (
    <>
      <div className='message-body'>
        <p>{message.text}</p>
      </div>
      <p className='msg-time'>{format(message.createdAt)}</p>
    </>
  );
};

export default Message;
