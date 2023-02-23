import React, { useState } from "react";
import "./Chatgpt.css"

function Chatgpt() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMessages([...messages, { text: input, sender: "user" }, { text: data.response, sender: "chatbot" }]);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, i) => (
          <div key={i} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatgpt
