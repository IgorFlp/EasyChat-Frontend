import React from "react";

const ChatHeader = () => {
  return (
    <div className="open_chat_header">
      <img
        src="src\assets\contact-img.svg"
        alt=""
        className="contact_item_img"
      />
      <label className="contact_item_texts-name">Nome do contato</label>
    </div>
  );
};

export default ChatHeader;
