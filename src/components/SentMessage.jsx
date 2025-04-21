import React from "react";

const SentMessage = ({ message }) => {
  return (
    <div className="open_chat_body_message-row">
      <div className="open_chat_body_sent-message">
        <label className="open_chat_body_sent-message-text">{message}</label>
        <label className="open_chat_body_sent-message-time">13:32</label>
      </div>
    </div>
  );
};

export default SentMessage;
