import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios, { all } from "axios";
import { useEffect, useState } from "react";

const ChatList = ({ groupedArray, contacts, onOpenChat }) => {
  const handleSelectChat = (common_id) => {
    const selectedIdentifier = common_id;
    onOpenChat(selectedIdentifier);
  };
  return (
    <>
      {groupedArray.map((group, index) => {
        const lastMessage = group[group.length - 1];
        return (
          <ChatItem
            key={index}
            contact={
              contacts.find((p) => {
                if (
                  group[0].common_id === p.whatsapp_id ||
                  group[0].common_id === p.instagram_id ||
                  group[0].common_id === p.telegram_id
                ) {
                  return p;
                }
              }) || {
                name: "",
                common_id: group[0].common_id,
                source: group[0].source,
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
