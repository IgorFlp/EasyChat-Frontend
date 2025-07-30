import React from "react";

const ContactItem = ({ contact }) => {
  console.log("Entrou no contact item: " + contact.name);
  return (
    <div className="contact-list-item">
      <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
      <div className="chat_item_texts">
        <label className="chat_item_texts-name">
          {contact.name ? contact.name : title}
        </label>
      </div>

      <label className="edit-contact contact-list-item-icons">
        <i class="bi bi-pencil-square"></i>
      </label>
      <label className="start-chat contact-list-item-icons">
        <i class="bi bi-chat-left-dots"></i>
      </label>
    </div>
  );
};

export default ContactItem;
