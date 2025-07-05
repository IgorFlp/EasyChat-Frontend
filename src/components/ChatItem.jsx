import React, { use } from "react";

const ChatItem = ({ messages, contact, onSelectChat }) => {
  const selectChat = (contact, messages) => {
    //console.log("ChatItem selectChat: " + JSON.stringify(messages));
    onSelectChat(contact, messages);
  };
  let date = new Date();
  date.setTime(messages[messages.length - 1].timestamp);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return (
    <>
      <div
        className="chat_item"
        onClick={() => {
          //console.log("messages on click: " + JSON.stringify(messages));
          selectChat(contact, messages);
        }}
      >
        <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
        <div className="chat_item_texts">
          <label className="chat_item_texts-name">
            {contact.name ? contact.name : contact.phone}
          </label>
          <div className="chat_item_texts_preview">
            <label className="chat_item_texts_preview-status">OK</label>
            <label className="chat_item_texts_preview-message">
              {messages[messages.length - 1].text}
            </label>
            <label className="chat_item_texts_preview-time">
              {hour + ":" + minutes}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
