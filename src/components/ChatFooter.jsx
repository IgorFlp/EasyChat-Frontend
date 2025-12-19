import React from "react";
import SentMessage from "./Message";
import { useState } from "react";

export default function ChatFooter({ onSendText }) {
  const [input, setInput] = useState("");

  const sendText = () => {
    if (input.trim() === "") return;
    onSendText({ number: "", text: input.trim() });
    setInput("");
  };

  return (
    <div className="open_chat_body_footer">
      <input
        className="open_chat_body_footer-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <label className="open_chat_body_footer-send" onClick={sendText}>
        <i className="bi bi-send"></i>
      </label>
    </div>
  );
}
