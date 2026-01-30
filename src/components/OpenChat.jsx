import React, { use } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { API_URL } from "../config.js";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";
import ChatPage from "../pages/chatpage.jsx";


export default function OpenChat({ chat, contact, messages, onSendText }) {
  
  const [isReady, setIsReady] = useState(false);
  //const [messages, setMessages] = useState([]);
    
useEffect(() => {
    if (chat && messages) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
}, [chat, messages]);

  const handleSendText = async (newMessage) => {
    newMessage.number = chat.remoteJid;
    onSendText(newMessage);
  };

  return (
    <>
      {isReady ? (
        <div className="chat_page_chat-window">
          <ChatHeader chat={chat} contact={contact} />
          <ChatMessagesContainer messages={messages} />
          <ChatFooter onSendText={handleSendText} />
        </div>
      ) : (
        <div>Selecione um chat</div>
      )}
    </>
  );
}
//
//
