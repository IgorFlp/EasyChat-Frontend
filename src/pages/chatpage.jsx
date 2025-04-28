import React from "react";
import OpenChat from "../components/OpenChat.jsx";
import ChatList from "../components/ChatList.jsx";
import { useState } from "react";
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});

  const handleSelectChat = (profile, messages) => {
    /*console.log(
      "Select chat ativo chatpage" +
        JSON.stringify(messages) +
        " " +
        JSON.stringify(profile)
    );*/
    setMessages(messages);
    setProfile(profile);
  };
  //console.log("Profile: " + JSON.stringify(profile));
  //console.log("Messages: " + JSON.stringify(messages));
  return (
    <div className="chat_page_container">
      <div className="chat_page_chat-list">
        <ChatList onOpenChat={handleSelectChat} />
      </div>

      <div className="chat_page_chat-window">
        {messages.length > 0 ? (
          <>
            {console.log("Profile: ", profile)}
            <OpenChat data={{ profile, messages }} />
          </>
        ) : (
          console.log("não tem mensagens!")
        )}
      </div>
    </div>
  );
};

export default ChatPage;
