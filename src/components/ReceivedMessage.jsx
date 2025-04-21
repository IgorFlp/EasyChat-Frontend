import React from "react";

const ReceivedMessage = (message) => {
  return (
    <div className="open_chat_body_message-row">
      <div className="open_chat_body_received-message">
        <label className="open_chat_body_received-message-text">
          {message.text}
        </label>
        <label className="open_chat_body_received-message-time">13:30</label>
      </div>
    </div>
  );
};

export default ReceivedMessage;
