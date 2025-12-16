import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios, { all } from "axios";
import { useEffect, useState } from "react";

const ChatList = ({ contacts, chats, onOpenChat }) => {
  const handleSelectChat = (chat) => {
    onOpenChat(chat);
  };
  return (
    <>
      {chats.map((chat, index) => {
        return (
          <ChatItem
            key={index}
            contacts={contacts}
            chat={chat}
            onSelectChat={() => {
              handleSelectChat(chat);
            }}
          />
        );
      })}
    </>
  );
};

export default ChatList;
