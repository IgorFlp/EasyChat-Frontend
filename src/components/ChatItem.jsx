import React from "react";

const ChatItem = ({ messages, onSelectChat }) => {
  const selectChat = (profile, messages) => {
    onSelectChat(profile, messages);
  };
  //messages = messages.messages;
  let contact = messages.find((msg) => msg.contacts && msg.contacts.length > 0)
    .contacts[0];

  let date = new Date();
  date.setTime(messages[messages.length - 1].timestamp);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return (
    <>
      <div className="chat_item" onClick={() => selectChat(contact, messages)}>
        <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
        <div className="chat_item_texts">
          <label className="chat_item_texts-name">
            {contact.profile.name ? contact.profile.name : contact.wa_id}
          </label>
          <div className="chat_item_texts_preview">
            <label className="chat_item_texts_preview-status">OK</label>
            <label className="chat_item_texts_preview-message">
              {messages[messages.length - 1].text.body}
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
