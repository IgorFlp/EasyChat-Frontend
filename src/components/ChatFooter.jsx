import React from "react";
import SentMessage from "./SentMessage";
import { useState } from "react";

export default function ChatFooter({ onSendMessage }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    onSendMessage({ mode: "sent", text: input });
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
