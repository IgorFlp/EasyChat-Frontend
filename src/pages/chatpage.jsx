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
  const [contacts, setContacts] = useState([]);
 
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  const [messagesByID, setMessagesByID] = useState({});
  const [chatByID, setChatByID] = useState({});
  
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

const groupMessagesById = (msgs) => {
  return msgs.reduce((acc, msg) => {
    const chatId = msg.key?.remoteJid.includes("@lid")? msg.key.remoteJidAlt : msg.key.remoteJid;
    
    if (!chatId) return acc;

    if (!acc[chatId]) {
      acc[chatId] = [];
    }

    acc[chatId].push(msg);
    return acc;
  }, {}); // 👈 TEM que ser {}
};
const dedupeMessages = (messages) => {
  const map = new Map();

  for (const msg of messages) {
    const realId = msg.key?.id;
    if (!realId) continue;

    // mantém a mais completa / mais recente
    if (!map.has(realId)) {
      map.set(realId, msg);
    }
  }

  return Array.from(map.values());
};
const normalizeMessageJid = (msg, mainJid) => ({
  ...msg,
  key: {
    ...msg.key,
    remoteJid: mainJid,
  },
});
const groupChatsById = (chats) => {
  return chats.reduce((acc, chat) => {
    
    const chatId = chat.lastMessage.key?.remoteJidAlt? chat.lastMessage.key.remoteJidAlt : chat.lastMessage.key.remoteJid;
    const altId = chat.lastMessage.key?.remoteJidAlt?.includes("@lid") ? chat.lastMessage.key.remoteJidAlt : chat.lastMessage.key.remoteJid;
    if (!chatId) return acc;

    if (!acc[chatId]) {
      acc[chatId] = [];
    }  
    acc[chatId].push(chat);    
    return acc;
  }  
  , {}); 
};

const normalizeChats = (groupedChats) => {

  return Object.entries(groupedChats).reduce(
     (acc, [chatId, chats]) => {

      // 1️⃣ escolhe o chat BASE (sempre o @s.whatsapp.net)
      const baseChat =
        chats.find(c => c.remoteJid.endsWith("@s.whatsapp.net")) ||
        chats[0];
      let altChat =
          chats.find(c => c.remoteJid.endsWith("@lid")) ||
        null;
      
      // 2️⃣ pega a mensagem mais recente ENTRE TODOS
      const latestMessage = chats
        .map(c => c.lastMessage)
        .filter(Boolean)
        .reduce((latest, current) => {
          return (current.messageTimestamp ?? 0) >
                 (latest.messageTimestamp ?? 0)
            ? current
            : latest;
        });

      // 4 cria o chat final corrigido
      acc[chatId] = {
        ...baseChat,
        lastMessage: latestMessage,
        altChat: altChat,
      };

      return acc;
    },
    {}
  );
};
  const fetchMessages = async (remoteJid,remoteJidAlt) => {
    try {
      let instance = localStorage.getItem("selected_instance");
      let url = `${API_URL}/chat/findMessages?instance=${instance}`;
      let init = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let bodyID = { remoteJid: remoteJid };
      let bodyAlt = { remoteJid: remoteJidAlt };
      const resId = await axios.post(url, bodyID, init);
      const resAlt = await axios.post(url, bodyAlt, init);
      const dataID = resId.data;     
      const dataAlt = resAlt.data;
      const merged = [...dataID.messages.records, ...dataAlt.messages.records];
      const deduped = dedupeMessages(merged);
      console.log("Deduped Messages: ", deduped);
      
      const gA = groupMessagesById(deduped);     
      console.log("Grouped Messages by ID: ", gA); 
      setMessagesByID(gA);
      
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const sendText = async (message) => {
    
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
       setMessagesByID((prev) => ({
       ...prev,
      [res.data.key.remoteJid]: [...(prev[res.data.key.remoteJid] || []), data],
    }));
      return data;
    } catch (error) {
      console.error("Error posting message:", error);
      return null;
    }
  };
  /*useEffect(() => {
    console.log("Messages by ID updated: ", messagesByID);
  }, [messagesByID]);*/
 
  const socket = io(SOCKET_URL);
  useEffect(() => {
    const fetchDatabases = async () => {
      const url = `${API_URL}/auth/user_databases`;
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
  if (!selectedChat) return;

  const remoteJid = selectedChat.remoteJid;
  const remoteJidAlt = selectedChat.altChat ? selectedChat.altChat.remoteJid : null;
    console.log("Selected Chat changed, fetching messages for:", remoteJid, remoteJidAlt);
  // só busca se ainda não tiver
  if (!messagesByID[remoteJid]) {
    fetchMessages(remoteJid,remoteJidAlt); 
  }
}, [selectedChat]);
  useEffect(() => {
    if (!selectedDatabase) return;

    const handleNewMessage = (msgEvent) => {      
      console.log("New message received via socket:", msgEvent);
      let remoteJid = msgEvent.data.key.remoteJid.includes('@lid') ? msgEvent.data.key.remoteJidAlt : msgEvent.data.key.remoteJid;
      
     setMessagesByID((prev) => ({
       ...prev,
      [remoteJid]: [...(prev[remoteJid] || []), msgEvent.data],
    }));
  }
    socket.on("new_message", handleNewMessage);

    const fetchChats = async () => {
      let instance = localStorage.getItem("selected_instance");
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
      
      let groupedChats = groupChatsById(chats);
      let normalized = normalizeChats(groupedChats);
      console.log("Normalized Chats: ", normalized);      
      setChats(normalized);
      
    };
    const fetchContacts = async () => {
      let contacts = [];
      let instance = localStorage.getItem("selected_instance");
      try {
        const url = `${API_URL}/contact/findContacts?instance=${instance}`;
        let ctts = await axios.post(
          url,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
    fetchContacts();
    
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [selectedDatabase]);
 
  const handleSelectChat = (chat) => {
    const ctt = contacts.filter((c) => c.remoteJid === chat.remoteJid);    
    if (ctt.length > 0) {
      setSelectedContact(ctt[0]);
    }
    setSelectedChat(chat);
  };

  return (
    <>
      <div className="chat_page_container">
        <ContactEdit contact={selectedContact} onCloseEditor={closeEditor} />
        <ContatcsMenu
          contacts={contacts}
          onOpenNewChat={openNewChat}
          onOpenEditor={openEditor}
        />
        <SideBar onShowContactMenu={showContactMenu} />
        <div className="chat_page_chat-list">
          <ChatList
            contacts={contacts}
            chats={chats}
            onOpenChat={handleSelectChat}
          />
        </div>
        <div className="chat_page_chat-window-container">
          {!selectedChat ? (
            <div className="empty-chat">Selecione um contato</div>
          ) : (
            <OpenChat chat={selectedChat} contact={selectedContact} messages={messagesByID[selectedChat.remoteJid]} onSendText={sendText} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
