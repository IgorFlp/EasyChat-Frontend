import React from "react";
import ContactItem from "./ContactItem";
import messages from "../assets/messages.json";
const ContactList = () => {
  const groupedMessages = messages.reduce((acc, msg) => {
    if (!acc[msg.number]) {
      acc[msg.number] = [];
    }
    acc[msg.number].push(msg);
    return acc;
  }, {});
  const groupedArray = Object.values(groupedMessages);
  return (
    <>
      {groupedArray.map((group, index) => {
        const lastMessage = group[group.length - 1];
        return <ContactItem key={index} messages={group} />;
      })}
    </>
  );
};

export default ContactList;
