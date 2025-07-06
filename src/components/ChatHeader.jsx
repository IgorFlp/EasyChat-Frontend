import React from "react";

const ChatHeader = ({ profile, selectedIdentifier }) => {
  //console.log("ChatHeader profile: ", profile);
  if (profile || selectedIdentifier) {
    //console.log("ChatHeader profile: ", profile.name);
    return (
      <div className="open_chat_header">
        <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
        <label className="chat_item_texts-name">
          {profile ? profile.name : selectedIdentifier}
        </label>
      </div>
    );
  }
};

export default ChatHeader;
