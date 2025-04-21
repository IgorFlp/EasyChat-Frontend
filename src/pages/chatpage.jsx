import React from "react";
import ContactItem from "../components/ContactItem.jsx";
import OpenChat from "../components/OpenChat.jsx";
import ContactList from "../components/ContactList.jsx";

const chat = () => {
  return (
    <div className="chat_page_container">
      <div className="chat_page_contact-list">
        <ContactList />
      </div>
      <div className="chat_page_chat-window">
        <OpenChat />
      </div>
    </div>
  );
};

export default chat;
