import React from "react";
import OpenChat from "../components/OpenChat.jsx";
import ChatList from "../components/ChatList.jsx";
import axios from "axios";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { API_URL, SOCKET_URL } from "../config.js";
import SideBar from "../components/SideBar.jsx";
import ContatcsMenu from "../components/ContatcsMenu.jsx";
import ContactEdit from "../components/ContactEdit.jsx";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [groupedArray, setGroupedArray] = useState([]);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState([]);

  const showContactMenu = (contacts) => {
    document.querySelector(".contacts-menu-container").classList.remove("hide");
  };
  function openEditor(contact) {
    document
      .querySelector(".contact-editor-container")
      .classList.remove("hide");

    setSelectedContact(contact);
    setIsEditingContact(true);
  }

  const closeEditor = () => {
    document.querySelector(".contact-editor-container").classList.add("hide");
    setIsEditingContact(false);
  };
  function openNewChat(contact) {
    let identifier = contact.common_id;
    setCurrentContact(contact);
    setCurrentMessages([]);
    setSelectedIdentifier(identifier);
  }
  const groupMessages = (msgs) => {
    let grouped = msgs.reduce((acc, msg, index) => {
      let common_id = msg.common_id;

      if (!acc[common_id]) {
        acc[common_id] = [];
      }
      acc[common_id].push(msg);
      return acc;
    }, []);
    return grouped;
  };
  const socket = io(SOCKET_URL);
  useEffect(() => {
    const fetchDatabases = async () => {
      const url = `${API_URL}/user_databases`;
      let dbs = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dbs = dbs.data;
      setDatabases(dbs);
      setSelectedDatabase(dbs[0]);
    };
    fetchDatabases();
  }, []);
  useEffect(() => {
    if (!selectedDatabase) return;

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("new_message", handleNewMessage);

    const fetchMessages = async () => {
      const url = `${API_URL}/messagesDB?database=${selectedDatabase.database_id}`;
      let msgs = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      msgs = msgs.data;
      setMessages(msgs);
    };
    const fetchChats = async () => {
      let instance = "Damaq - Igor";
      const url = `${API_URL}/chat/findChats?instance=${instance}`;
      let chats = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      chats = chats.data;
      console.log("chats: " + JSON.stringify(chats[1]));
      setChats(chats);
      //setMessages(msgs);
    };
    const fetchContacts = async () => {
      let contacts = [];
      try {
        const url = `${API_URL}/contacts?database=${selectedDatabase.database_id}`;
        let ctts = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!ctts.data || ctts.data.length === 0 || ctts.status == 204) {
          contacts = [];
        } else {
          contacts = ctts.data;
        }
      } catch (error) {
        console.log("Erro: ", error);
        return;
      }

      setContacts(contacts);
    };
    fetchChats();
    //fetchContacts();
    //fetchMessages();
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [selectedDatabase]);
  useEffect(() => {
    if (messages.length > 0) {
      const gA = Object.values(groupMessages(messages));

      setGroupedArray(gA);
      if (selectedIdentifier) {
        const cM = gA.filter((group) => {
          const gp = group.filter(
            (msg) => msg.common_id === selectedIdentifier
          );
          if (gp.length > 0) {
            return gp;
          }
        });
        setCurrentMessages(...cM);
      }
    }
  }, [messages]);

  const handleSelectChat = (selectedIdentifier) => {
    const cM = groupedArray.filter((group) => {
      const gp = group.filter((msg) => msg.common_id === selectedIdentifier);
      if (gp.length > 0) {
        return gp;
      }
    });

    let cC = contacts.find((p) => {
      switch (p.source) {
        case "Whatsapp":
          return p.whatsapp_id === selectedIdentifier;
        case "Instagram":
          return p.instagram_id === selectedIdentifier;
        case "Telegram":
          return p.telegram_id === selectedIdentifier;
        default:
          return null;
      }
    });
    if (!cC) {
      cC = {
        name: "",
        common_id: selectedIdentifier,
        source: cM[0][0].source,
      };
    }

    setCurrentContact(cC);
    setCurrentMessages(...cM);
    setSelectedIdentifier(selectedIdentifier);
  };

  return (
    <>
      <ContactEdit contact={selectedContact} onCloseEditor={closeEditor} />
      <ContatcsMenu
        contacts={contacts}
        onOpenNewChat={openNewChat}
        onOpenEditor={openEditor}
      />
      <div className="chat_page_container">
        <SideBar onShowContactMenu={showContactMenu} />
        <div className="chat_page_chat-list">
          <ChatList
            groupedArray={groupedArray}
            contacts={contacts}
            messages={messages}
            chats={chats}
            onOpenChat={handleSelectChat}
          />
        </div>

        <div className="chat_page_chat-window-container">
          {!selectedIdentifier && !currentContact ? (
            <div className="empty-chat">Selecione um contato</div>
          ) : (
            <OpenChat
              contact={currentContact}
              messages={currentMessages}
              selectedIdentifier={selectedIdentifier}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
