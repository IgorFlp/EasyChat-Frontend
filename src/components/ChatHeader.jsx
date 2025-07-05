import React from "react";

const ChatHeader = ({ profile }) => {
  console.log("ChatHeader profile: ", profile);
  if (profile) {
    //console.log("ChatHeader profile: ", profile.name);
    return (
      <div className="open_chat_header">
        <img src="src\assets\chat-img.svg" alt="" className="chat_item_img" />
        <label className="chat_item_texts-name">
          {profile.name ? profile.name : profile.phone}
        </label>
      </div>
    );
  }
};

export default ChatHeader;
