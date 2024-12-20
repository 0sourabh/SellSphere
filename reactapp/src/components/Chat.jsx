import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const users = [
    { id: "123", name: "Sourabh" }, // Current user
    { id: "456", name: "Shrivanshu" },
    { id: "789", name: "Tuhar" },
    { id: "759", name: "Sujal" },
  ];

  const [activeUser, setActiveUser] = useState(users[1]); // Default selected user
  const [messages, setMessages] = useState({
    456: [
      { sender: "123", text: "Hi Shrivanshu!", id: 1 },
      { sender: "456", text: "Hello! How can I help you?", id: 2 },
    ],
    789: [
      { sender: "123", text: "Hi Tushar!", id: 1 },
      { sender: "789", text: "Hey! What's up?", id: 2 },
    ],
    759: [
      { sender: "123", text: "Hi Sujal!", id: 1 },
      { sender: "789", text: "Hey! What's up?", id: 2 },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const userId = "123"; // Simulated current user ID

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: userId,
      text: newMessage,
      id: (messages[activeUser.id]?.length || 0) + 1,
    };

    const simulatedReply = {
      sender: activeUser.id,
      text: "Got it! Let me check.",
      id: (messages[activeUser.id]?.length || 0) + 2,
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeUser.id]: [...(prevMessages[activeUser.id] || []), newMsg],
    }));
    setNewMessage("");

    setTimeout(() => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeUser.id]: [...(prevMessages[activeUser.id] || []), simulatedReply],
      }));
    }, 1000);
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h3>SELLSPHERE</h3>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/chat" className="active">Messages</a></li>
            <li><a href="/my-profile">Profile</a></li>
          </ul>
        </nav>
      </aside>
      <main className="chat-main">
        <div className="message-list">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="user-buttons">
            {users.map((user) => (
              <button
                key={user.id}
                className={`user-button ${activeUser.id === user.id ? "active" : ""}`}
                onClick={() => setActiveUser(user)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
        <div className="chat-window">
          <div className="chat-header">Chat with {activeUser.name}</div>
          <div className="messages">
            {(messages[activeUser.id] || []).map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender === userId ? "sent" : "received"}`}
              >
                <div
                  className={`message-box ${message.sender === userId ? "sent" : "received"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
