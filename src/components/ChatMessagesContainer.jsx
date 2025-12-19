import React, { use, useEffect } from "react";
import Message from "./Message";
import { useState } from "react";

const ChatMessages = ({ messages }) => {
  const [sortedMessages, setSortedMessages] = useState([]);

  useEffect(() => {
    if (!messages || !messages.messages || !messages.messages.records) {
      return;
    }

    const m = [...messages.messages.records];
    m.sort(
      (a, b) =>
        new Date(Number(a.messageTimestamp) * 1000) -
        new Date(Number(b.messageTimestamp) * 1000)
    );
    //console.log("sorted messages: " + JSON.stringify(m));
    setSortedMessages(m);
  }, [messages]);
  return (
    <div className="open_chat_body">
      <div className="open_chat_body_messages-container">
        {sortedMessages.map((msg, index) => {
          return <Message message={msg} />;
        })}
      </div>
    </div>
  );
};

export default ChatMessages;
