import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import { useState } from "react";

const ChatMessages = ({ messages }) => {
  return (
    <div className="open_chat_body">
      {console.log(messages)}
      <div className="open_chat_body_messages-container">
        {messages.map((msg, index) =>
          msg.mode === "sent" ? (
            <SentMessage key={index} message={msg.text} />
          ) : (
            <ReceivedMessage key={index} text={msg.text} />
          )
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
