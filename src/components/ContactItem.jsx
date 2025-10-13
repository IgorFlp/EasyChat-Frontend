import React from "react";
import { useState } from "react";
import ContactEdit from "./ContactEdit";
const ContactItem = ({ contact, onOpen, onChat }) => {
  //console.log("Entrou no contact item: " + contact.name);
  return (
    <div className="contact-list-item">
      <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
      <div className="chat_item_texts">
        <label className="chat_item_texts-name">
          {contact.name ? contact.name : title}
        </label>
      </div>

      <label
        className="edit-contact contact-list-item-icons"
        onClick={() => onOpen(contact)}
      >
        <i className="bi bi-pencil-square"></i>
      </label>
      <label
        className="start-chat contact-list-item-icons"
        onClick={() => onChat(contact)}
      >
        <i className="bi bi-chat-left-dots"></i>
      </label>
    </div>
  );
};

export default ContactItem;
