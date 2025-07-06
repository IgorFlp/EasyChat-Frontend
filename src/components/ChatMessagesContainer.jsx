import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import { useState } from "react";

const ChatMessages = ({ messages }) => {
  //console.log("ChatMessages", messages);
  return (
    <div className="open_chat_body">
      <div className="open_chat_body_messages-container">
        {messages
          .sort(
            (a, b) =>
              new Date(Number(a.timestamp) * 1000) -
              new Date(Number(b.timestamp) * 1000)
          )
          .map((msg, index) => {
            if (msg.mode === "sent") {
              //console.log("msg sent: " + JSON.stringify(msg.text.body));
              return <SentMessage key={index} message={msg} />;
            } else {
              //console.log("msg received: " + JSON.stringify(msg));
              return <ReceivedMessage key={index} message={msg} />;
            }
          })}
      </div>
    </div>
  );
};

export default ChatMessages;
