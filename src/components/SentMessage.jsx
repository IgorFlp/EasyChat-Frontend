import React from "react";

const SentMessage = ({ message }) => {
  //console.log("SentMessage: ", message);
  let date = new Date();
  date.setTime(message.timestamp);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let timestamp = hour + ":" + minutes;
  return (
    <div className="open_chat_body_message-row">
      <div className="open_chat_body_sent-message">
        <label className="open_chat_body_sent-message-text">
          {message.text}
        </label>
        <label className="open_chat_body_sent-message-time">{timestamp}</label>
      </div>
    </div>
  );
};

export default SentMessage;
