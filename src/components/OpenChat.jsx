import React from "react";

const OpenChat = () => {
  return (
    <div>
      <div className="open_chat_header">
        <img
          src="src\assets\contact-img.svg"
          alt=""
          className="contact_item_img"
        />
        <label className="contact_item_texts-name">Nome do contato</label>
      </div>
      <div className="open_chat_body">
        <div className="open_chat_body_messages-container">
          <div className="open_chat_body_message-row">
            <div className="open_chat_body_received-message">
              <label className="open_chat_body_received-message-text">
                “The night has a thousand eyes, And the day but one; Yet the
                light of the bright world dies With the dying sun."
              </label>
              <label className="open_chat_body_received-message-time">
                13:30
              </label>
            </div>
          </div>
          <div className="open_chat_body_message-row">
            <div className="open_chat_body_sent-message">
              <label className="open_chat_body_sent-message-text">
                "The mind has a thousand eyes, And the heart but one: Yet the
                light of a whole life dies When love is done.”
              </label>
              <label className="open_chat_body_sent-message-time">13:32</label>
            </div>
          </div>
        </div>
        <div className="open_chat_body_entry">
          <input className="open_chat_body_entry-input"></input>

          <label className="open_chat_body_entry-send">send</label>
        </div>
      </div>
    </div>
  );
};

export default OpenChat;
