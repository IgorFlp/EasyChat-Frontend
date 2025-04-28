import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios from "axios";
import { useEffect, useState } from "react";
const ChatList = ({ onOpenChat }) => {
  const [groupedArray, setGroupedArray] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState([]);

  const handleSelectChat = (profile, messages) => {
    setMessages(() => [messages]);
    setProfile(() => [profile]);
    onOpenChat(profile, messages);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const url = "http://localhost:3000/messagesDB";
      let msgs = await axios.get(url);
      msgs = msgs.data;
      let messages = [];

      for (let i = 0; i < msgs.received.length; i++) {
        messages.push(msgs.received[i].entry[0].changes[0].value);
      }
      for (let i = 0; i < msgs.sent.length; i++) {
        messages.push(msgs.sent[i]);
      }

      const groupedMessages = messages.reduce((acc, msg) => {
        let number;
        if (msg.messages) {
          number = msg.messages[0].from;
        } else {
          number = msg.to;
        }
        if (!acc[number]) {
          acc[number] = [];
        }
        acc[number].push(msg);
        return acc;
      }, {});

      const groupedArray = Object.values(groupedMessages);
      setGroupedArray(groupedArray);
      //console.log(groupedArray);
    };
    fetchMessages();
  }, []);
  return (
    <>
      {groupedArray.map((group, index) => {
        //console.log("group: " + JSON.stringify(group));
        const lastMessage = group[group.length - 1];
        return (
          <ChatItem
            key={index}
            messages={group}
            onSelectChat={handleSelectChat}
          />
        );
      })}
    </>
  );
};

export default ChatList;
