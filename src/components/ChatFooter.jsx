import React from "react";
import SentMessage from "./SentMessage";
import { useState } from "react";

export default function ChatFooter({ onSendMessage, contact }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const date = new Date();
    date.setTime(Date.now());
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const timestamp = `${hour}:${minutes}`;

    if (contact.source === "telegram") {
      onSendMessage({
        messaging_product: contact.source,
        to: contact.common_id,
        type: "text",
        text: input,
      });
    }
    if (contact.source === "whatsapp") {
      onSendMessage({
        messaging_product: contact.source,
        to: contact.common_id,
        type: "text",
        text: { preview_url: true, body: input },
      });
    }
    setInput("");
  };

  return (
    <div className="open_chat_body_footer">
      <input
        className="open_chat_body_footer-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <label className="open_chat_body_footer-send" onClick={sendMessage}>
        <i className="bi bi-send"></i>
      </label>
    </div>
  );
}
