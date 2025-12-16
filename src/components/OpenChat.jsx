import React from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { API_URL, USER_INSTANCE } from "../config.js";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";

export default function OpenChat({ chat, contact }) {
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (chat) {
      setIsReady(true);
    }
    fetchMessages(chat.remoteJid);
  }, [chat]);

  const fetchMessages = async (remoteJid) => {
    try {
      let url = `${API_URL}/chat/findMessages?instance=${USER_INSTANCE}`;
      let init = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let body = { remoteJid: remoteJid };
      const res = await axios.post(url, body, init);
      const data = res.data;

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendText = async (message) => {
    console.log("Sending message: ", message);
    try {
      let url = `${API_URL}/sendText?instance=${USER_INSTANCE}`;
      let init = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let body = message;
      const response = await axios.post(url, body, init);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting message:", error);
      return null;
    }
  };
  const handleSendText = async (newMessage) => {
    newMessage.number = chat.remoteJid;
    console.log("handleSendMessage: ", newMessage);
    let res = await sendText(newMessage);
    console.log("Message sent: ", res);
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
