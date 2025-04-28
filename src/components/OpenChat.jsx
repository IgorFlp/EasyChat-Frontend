import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatMessagesContainer from "./ChatMessagesContainer";
import { useState, useEffect } from "react";

export default function OpenChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  const [isReady, setIsReady] = useState(false);
  console.log("OpenChat mesages: ", data.messages);
  useEffect(() => {
    //console.log("OpenChat disparou useEffect");
    if (data && data.messages && data.profile) {
      // só entra se data estiver ok
      setMessages(data.messages);
      setProfile(data.profile);
      setIsReady(true);
      //console.log("Entrou no if de useeffect");
    }
  }, [data.messages, data.profile]);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <ChatHeader profile={data.profile} />
      <ChatMessagesContainer messages={messages} />
      <ChatFooter onSendMessage={handleSendMessage} profile={data.profile} />
    </div>
  );
}
