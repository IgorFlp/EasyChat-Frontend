import React from "react";
import SentMessage from "./SentMessage";
import { useState } from "react";

export default function ChatFooter({ onSendMessage, profile }) {
  //console.log("ChatFooter profile: ", profile);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const date = new Date();
    date.setTime(Date.now());
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const timestamp = `${hour}:${minutes}`;

    onSendMessage({
      _id: "",
      messaging_product: "whatsapp",
      to: `${profile.wa_id}`,
      type: "text",
      text: {
        preview_url: true,
        body: `${input}`,
      },
      mode: "sent",
      timestamp: `${timestamp}`,
    });
    setInput(""); // limpa input
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
