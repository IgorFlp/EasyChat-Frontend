import React from "react";
import { useState } from "react";
import ContactEdit from "./ContactEdit";
const ContactItem = ({ contact, onOpen, onChat }) => {
  //console.log("Entrou no contact item: " + contact.name);
  return (
    <div className="contact-list-item">
      <img
        src={
          contact.profilePicUrl
            ? contact.profilePicUrl
            : "src/assets/chat-img.svg"
        }
        alt="Falha no carregamento"
        className="chat-item-img"
      />
      <div className="chat-item-texts">
        <label className="primary-text">
          {contact.pushName ? contact.pushName : contact.remoteJid}
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
