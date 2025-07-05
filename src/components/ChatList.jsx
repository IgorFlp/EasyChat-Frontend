import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios from "axios";
import { useEffect, useState } from "react";
const ChatList = ({ onOpenChat }) => {
  const [groupedArray, setGroupedArray] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState([]);
  const [contacts, setContacts] = useState([]);

  const handleSelectChat = (profile, messages) => {
    /*console.log(
      "Select chat ativo chatlist " +
        JSON.stringify(messages) +
        " " +
        JSON.stringify(profile)
    );*/
    setMessages(() => [messages]);
    setProfile(() => [profile]);
    onOpenChat(profile, messages);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const url = "http://localhost:3000/messagesDB";
      let msgs = await axios.get(url);
      msgs = msgs.data;
      //console.log("msgs: " + JSON.stringify(msgs));
      setMessages(msgs);

      /*
      for (let i = 0; i < msgs.length; i++) {
        messages.push(msgs.recipient[i]);
      }
      for (let i = 0; i < msgs.sent.length; i++) {
        messages.push(msgs.sent[i]);
      }*/

      const groupedMessages = msgs.reduce((acc, msg) => {
        let number;
        if (msg.mode === "sent") {
          number = msg.recipient;
        } else {
          number = msg.sender;
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
    const fetchContacts = async () => {
      let contacts = [];
      try {
        const url = "http://localhost:3000/contacts";
        let contacts = await axios.get(url);
        if (
          !contacts.data ||
          contacts.data.length === 0 ||
          contacts.response.status == 204
        ) {
          console.log("Nenhum contato encontrado.");
          contacts = [];
        } else {
          contacts = contacts.data;
        }
      } catch (error) {
        console.error("Nenhum contato encontrado.");
        return;
      }
      //console.log("contacts: " + JSON.stringify(contacts));
      setContacts(contacts);
    };
    fetchContacts();
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
            contact={
              contacts.find((p) => {
                if (msg.mode === "received") {
                  return msg.sender;
                }
              }) || {
                profile: {
                  name: "",
                },
                phone:
                  group[0].mode === "received"
                    ? group[0].sender
                    : group[0].recipient,
              }
            }
            messages={group}
            onSelectChat={handleSelectChat}
          />
        );
      })}
    </>
  );
};

export default ChatList;
