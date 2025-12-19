import React from "react";

const ChatHeader = ({ chat, contact }) => {
  //console.log("ChatHeader contact: ", contact);
  if (chat) {
    //console.log("ChatHeader profile: ", profile.name);
    return (
      <div className="open_chat_header">
        <img src={chat.profilePicUrl} alt="" className="chat-item-img" />
        <label className="chat-item-texts-name">
          {contact.pushName
            ? contact.pushName + " (" + chat.remoteJid + ")"
            : chat.pushName + " (" + chat.remoteJid + ")"
            ? chat.pushName + " (" + chat.remoteJid + ")"
            : chat.remoteJid.split("@", [0])}
        </label>
      </div>
    );
  }
};

export default ChatHeader;
