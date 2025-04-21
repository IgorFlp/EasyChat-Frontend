import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";

export default function OpenChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulando mensagens anteriores (pode vir de API, localStorage etc.)
    const previousMessages = [
      {
        mode: "received",
        text: "“The night has a thousand eyes, And the day but one; Yet the light of the bright world dies With the dying sun.",
      },
      {
        mode: "sent",
        text: "The mind has a thousand eyes, the heart but one, Yet the ligth of a whole life dies, when love is done",
      },
    ];
    setMessages(previousMessages);
  }, []);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <ChatHeader />
      <ChatMessagesContainer messages={messages} />
      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
}
