import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";

export default function OpenChat({ messages, profile, selectedIdentifier }) {
  //const [messages, setMessages] = useState([]);
  //const [profile, setProfile] = useState({});
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if ((messages && messages.length > 0) || profile) {
      setIsReady(true);
    }
  }, [messages, profile]);
  const postMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      //console.log("Message posted successfully:", data);
      return data; // agora sim retorna o JSON
    } catch (error) {
      console.error("Error posting message:", error);
      return null;
    }
  };
  const handleSendMessage = async (newMessage) => {
    let msg = await postMessage(newMessage);
    //console.log("Message sent: ", msg);
    //setMessages((prevMessages) => [...prevMessages, msg]);
  };
  console.log("OpenChat messages: ", messages);
  //console.log("OpenChat profile: ", profile);
  return (
    <div>
      <>
        {isReady ? (
          <>
            <ChatHeader
              profile={profile}
              selectedIdentifier={selectedIdentifier}
            />
            <ChatMessagesContainer messages={messages} />
            <ChatFooter onSendMessage={handleSendMessage} profile={profile} />
          </>
        ) : (
          <div>Selecione um chat</div>
        )}
      </>
    </div>
  );
}
