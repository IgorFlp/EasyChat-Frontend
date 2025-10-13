import React, { use, useEffect } from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import { useState } from "react";

const ChatMessages = ({ messages }) => {
  const [sortedMessages, setSortedMessages] = useState([]);

  useEffect(() => {
    let m = messages.sort(
      (a, b) =>
        new Date(Number(a.timestamp) * 1000) -
        new Date(Number(b.timestamp) * 1000)
    );
    setSortedMessages(m);
  }, [messages]);
  return (
    <div className="open_chat_body">
      <div className="open_chat_body_messages-container">
        {sortedMessages.map((msg, index) => {
          if (msg.mode === "sent") {
            return <SentMessage key={index} message={msg} />;
          } else {
            return <ReceivedMessage key={index} message={msg} />;
          }
        })}
      </div>
    </div>
  );
};

export default ChatMessages;
