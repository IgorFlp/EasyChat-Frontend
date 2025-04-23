import React from "react";

const ContactItem = (messages) => {
  messages = messages.messages;
  console.log(messages);
  return (
    <>
      <div className="contact_item">
        <img
          src="src\assets\contact-img.svg"
          alt=""
          className="contact_item_img"
        />
        <div className="contact_item_texts">
          <label className="contact_item_texts-name">{messages[0].name}</label>
          <div className="contact_item_texts_preview">
            <label className="contact_item_texts_preview-status">OK</label>
            <label className="contact_item_texts_preview-message">
              {messages[messages.length - 1].text}
            </label>
            <label className="contact_item_texts_preview-time">
              {messages[messages.length - 1].timestamp}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
