import React from "react";

const ChatHeader = ({ contact, selectedIdentifier }) => {
  //console.log("ChatHeader contact: ", contact);
  if (contact || selectedIdentifier) {
    //console.log("ChatHeader profile: ", profile.name);
    return (
      <div className="open_chat_header">
        <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
        <label className="chat_item_texts-name">
          {contact.name ? contact.name : selectedIdentifier}
        </label>
      </div>
    );
  }
};

export default ChatHeader;
