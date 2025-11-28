import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios, { all } from "axios";
import { useEffect, useState } from "react";

const ChatList = ({ contacts, chats, onOpenChat }) => {
  const handleSelectChat = (common_id) => {
    const selectedIdentifier = common_id;
    onOpenChat(selectedIdentifier);
  };
  return (
    <>
      {chats.map((chat, index) => {
        return (
          <ChatItem
            key={index}
            contacts={contacts}
            chat={chat}
            onSelectChat={handleSelectChat}
          />
        );
      })}
    </>
  );
};

export default ChatList;
