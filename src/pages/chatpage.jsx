import React from "react";
import OpenChat from "../components/OpenChat.jsx";
import ChatList from "../components/ChatList.jsx";
import axios from "axios";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState({});
  const [groupedArray, setGroupedArray] = useState([]);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentContact, setCurrentContact] = useState({});

  const groupMessages = (msgs) => {
    let grouped = msgs.reduce((acc, msg, index) => {
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
    }, []);
    return grouped;
  };
  const socket = io(API_URL);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      console.log("Recebida:", msg);
      setMessages((prev) => [...prev, msg]);
      //console.log("Mensagens atualizadas:", messages);
    };
    socket.on("new_message", handleNewMessage);
    const fetchMessages = async () => {
      const url = "http://localhost:3000/messagesDB";
      let msgs = await axios.get(url);
      msgs = msgs.data;
      setMessages(msgs);

      //const groupedArray = Object.values(groupMessages(messages));
      //console.log("Grouped Array: ", groupedArray);
      //setGroupedArray(groupedArray);
      //console.log(groupedArray);
    };
    const fetchContacts = async () => {
      let contacts = [];
      try {
        const url = "http://localhost:3000/contacts";
        let ctts = await axios.get(url);
        if (!ctts.data || ctts.data.length === 0 || ctts.status == 204) {
          console.log("Nenhum contato encontrado.");
          contacts = [];
        } else {
          contacts = ctts.data;
          console.log("Contatos encontrados: ", contacts);
        }
      } catch (error) {
        console.log("Erro: ", error);
        return;
      }
      //console.log("contacts: " + JSON.stringify(contacts));
      setContacts(contacts);
    };
    fetchContacts();
    fetchMessages();
    return () => {
      socket.off("new_message", handleNewMessage); // Remove listener ao desmontar
    };
  }, []);
  useEffect(() => {
    const groupedArray = Object.values(groupMessages(messages));
    console.log("Grouped Array: ", groupedArray);
    setGroupedArray(groupedArray);
    //console.log("mensagens atualizadas: " + JSON.stringify(messages));
  }, [messages]);

  const handleSelectChat = (selectedIdentifier) => {
    /*console.log(
      "Select chat ativo chatpage " +
        JSON.stringify(messages) +
        " " +
        JSON.stringify(profile)
    );*/
    const cM = groupedArray.filter((group) => {
      const gp = group.filter(
        (msg) =>
          msg.recipient === selectedIdentifier ||
          msg.sender === selectedIdentifier
      );
      if (gp.length > 0) {
        return gp;
      }
    });

    const cC = contacts.find(
      (p) => p.number === selectedIdentifier || p.handle === selectedIdentifier
    );
    setCurrentContact(cC);
    setCurrentMessages(...cM);
    setSelectedIdentifier(selectedIdentifier);
    console.log("Selected Identifier: ", selectedIdentifier);
    console.log("Current Messages: ", cM);
    //console.log("Current Contact: ", currentContact);
    //console.log("Profile: " + JSON.stringify(profile));
    //console.log("Messages: " + JSON.stringify(messages));
  };
  return (
    <div className="chat_page_container">
      <div className="chat_page_chat-list">
        <ChatList
          groupedArray={groupedArray}
          contacts={contacts}
          messages={messages}
          onOpenChat={handleSelectChat}
        />
      </div>

      <div className="chat_page_chat-window">
        {messages.length > 0 ? (
          <>
            <OpenChat
              profile={currentContact}
              messages={currentMessages}
              selectedIdentifier={selectedIdentifier}
            />
          </>
        ) : (
          console.log("não tem mensagens!")
        )}
      </div>
    </div>
  );
};

export default ChatPage;
