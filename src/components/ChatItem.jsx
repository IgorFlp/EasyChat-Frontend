import React, { use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const ChatItem = ({ messages, contact, chat, onSelectChat }) => {
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
        <img src={chat.profilePicUrl} alt="" className="chat_item_img" />
        <div className="chat_item_texts">
          <label className="chat_item_texts-name">
            {chat.pushName != "" ? chat.pushName : chat.remoteJid}
          </label>
          <div className="chat_item_texts_preview">
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
            <label className="chat_item_texts_preview-time">
              {hour + ":" + minutes}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
