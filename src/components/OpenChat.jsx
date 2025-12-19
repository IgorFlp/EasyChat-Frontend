import React from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { API_URL } from "../config.js";
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
      let instance = localStorage.getItem("selected_instance");
      let url = `${API_URL}/chat/findMessages?instance=${instance}`;
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
      let instance = localStorage.getItem("selected_instance");
      let url = `${API_URL}/sendText?instance=${instance}`;
      let init = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let body = message;
      const res = await axios.post(url, body, init).then((res) => res);
      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error posting message:", error);
      return null;
    }
  };
  const handleSendText = async (newMessage) => {
    newMessage.number = chat.remoteJid;
    let res = await sendText(newMessage);
    if (res) {
      fetchMessages(chat.remoteJid);
    }
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
