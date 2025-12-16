import React from "react";

const Message = ({ message }) => {
  //console.log("SentMessage: ", message);
  let date = new Date();
  date.setTime(message.messageTimestamp);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let timestamp = hour + ":" + minutes;

  let classe = message.key.fromMe
    ? "open_chat_body_sent-message"
    : "open_chat_body_received-message";

  switch (message.messageType) {
    case "conversation":
      return (
        <div className="open_chat_body_message-row">
          <div className={`${classe}`}>
            <label className={`${classe}-text`}>
              {message.message.conversation}
            </label>
            <label className={`${classe}-time`}>{timestamp}</label>
          </div>
        </div>
      );
    case "imageMessage":
      return (
        <div className="open_chat_body_message-row">
          <div className={`${classe}`}>
            <img src={message.message.imageMessage.url}></img>
            <label className={`${classe}-text`}>
              {message.message.conversation}
            </label>
            <label className={`${classe}-time`}>{timestamp}</label>
          </div>
        </div>
      );
    case "audioMessage":
      return <></>;
  }
};

export default Message;
