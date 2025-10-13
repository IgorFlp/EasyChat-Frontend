import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { API_URL } from "../config.js";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";

export default function OpenChat({ messages, contact, selectedIdentifier }) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if ((messages && messages.length > 0) || contact) {
      setIsReady(true);
    }
  }, [messages, contact]);
  const postMessage = async (message) => {
    try {
      const response = await fetch(`${API_URL}/messageTelegram`, {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error posting message:", error);
      return null;
    }
  };
  const handleSendMessage = async (newMessage) => {
    let msg = await postMessage(newMessage);
  };

  return (
    <>
      {isReady ? (
        <div className="chat_page_chat-window">
          <ChatHeader
            contact={contact}
            selectedIdentifier={selectedIdentifier}
          />
          <ChatMessagesContainer messages={messages} />
          <ChatFooter onSendMessage={handleSendMessage} contact={contact} />
        </div>
      ) : (
        <div>Selecione um chat</div>
      )}
    </>
  );
}
