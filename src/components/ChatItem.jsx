import React, { use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const ChatItem = ({ contacts, chat, onSelectChat }) => {
  let contact = [];
  const selectChat = (chat) => {
    //console.log("ChatItem selectChat: " + JSON.stringify(messages));
    onSelectChat(chat);
  };
  const statusIcon = (status) => {
    switch (status) {
      case "SERVER_ACK":
        return <FontAwesomeIcon icon={faCheckDouble} />;
      case "DELIVERY_ACK":
        return null;
    }
  };
  const IsContact = async (chat) => {
    contact = [];
    //console.log("chat remoteJid: " + contacts[2].remoteJid);
    const ctt = contacts.filter((c) => c.remoteJid === chat.remoteJid);
    //console.log("contact chat item: " + JSON.stringify(ctt));
    if (ctt.length > 0) {
      contact = ctt[0];
    } else {
      contact = false;
    }
  };
  const messageLine = (chat) => {
    switch (chat.lastMessage.messageType) {
      case "conversation":
        return (
          <div>
            <label>{chat.lastMessage.message.conversation}</label>
          </div>
        );
      case "imageMessage":
        return (
          <div>
            <FontAwesomeIcon icon={faImage} />
            <label>
              {chat.lastMessage.message.imageMessage.caption
                ? chat.lastMessage.message.imageMessage.caption
                : "Foto"}
            </label>
          </div>
        );
      case "audioMessage":
        return (
          <div>
            <FontAwesomeIcon icon={faHeadphones} />
            <label>
              {chat.lastMessage.message.audioMessage.minutes
                ? `${chat.lastMessage.message.audioMessage.minutes}:${chat.lastMessage.message.audioMessage.seconds}`
                : `00:${chat.lastMessage.message.audioMessage.seconds}`}
            </label>
          </div>
        );
    }
  };
  const statusI = statusIcon(chat.lastMessage.status);
  IsContact(chat);
  //console.log("contact chat item: " + JSON.stringify(contact));
  let date = new Date();
  date.setTime(chat.lastMessage.messageTimestamp * 1000);
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    <>
      <div
        className="chat_item"
        onClick={() => {
          //console.log("messages on click: " + JSON.stringify(messages));
          selectChat(chat);
        }}
      >
        <img src={chat.profilePicUrl} alt="" className="chat-item-img" />
        <div className="chat-item-texts">
          <div className="chat-item-row1">
            <label className="chat-item-row1-name primary-text">
              {contact.pushName
                ? contact.pushName
                : chat.pushName
                ? chat.pushName
                : chat.remoteJid.replace("@s.whatsapp.net", "")}
            </label>
            <label className="chat-item-row1-time secondary-text">
              {hour + ":" + minutes}
            </label>
          </div>
          <div className="chat-item-row2 secondary-text">
            {statusI != null ? (
              <label className="chat_item_texts_preview-status">
                {statusI}
              </label>
            ) : (
              <></>
            )}
            <label className="chat_item_texts_preview-message">
              {messageLine(chat)}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
