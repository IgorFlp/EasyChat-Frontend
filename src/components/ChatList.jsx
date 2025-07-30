import React, { use } from "react";
import ChatItem from "./ChatItem";
import axios, { all } from "axios";
import { useEffect, useState } from "react";

const ChatList = ({ groupedArray, contacts, onOpenChat }) => {
  const handleSelectChat = (profile) => {
    const selectedIdentifier = profile.number ? profile.number : profile.handle;
    console.log("Select chat ativo chatlist " + selectedIdentifier);
    /*console.log(
      "Select chat ativo chatlist " +
        JSON.stringify(messages) +
        " " +
        JSON.stringify(profile)
    );*/
    onOpenChat(selectedIdentifier);
  };
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
                if (group[0].contact_id === p.id) {
                  //console.log("found contact: ", p);
                  return p;
                }
              }) || {
                name: "",
                number:
                  group[0].mode === "received"
                    ? group[0].sender
                    : group[0].recipient,
                handle:
                  group[0].mode === "received"
                    ? group[0].sender
                    : group[0].recipient,
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
