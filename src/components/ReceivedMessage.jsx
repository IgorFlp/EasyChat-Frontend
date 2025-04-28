import React from "react";

const ReceivedMessage = ({ message }) => {
  //console.log("ReceivedMessage", message);
  let date = new Date();
  date.setTime(message.messages[0].timestamp);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let timestamp = hour + ":" + minutes;
  return (
    <div className="open_chat_body_message-row">
      <div className="open_chat_body_received-message">
        <label className="open_chat_body_received-message-text">
          {message.messages[0].text.body}
        </label>
        <label className="open_chat_body_received-message-time">
          {timestamp}
        </label>
      </div>
    </div>
  );
};

export default ReceivedMessage;
