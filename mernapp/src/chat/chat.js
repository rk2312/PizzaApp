import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [user, setUser] = useState({ _id: "" }); // Initially empty user
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]); // Storing all received messages

  // Get user ID from localStorage on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Assuming you store the userId in localStorage
      console.log(userId);
    if (userId) {
      setUser({ _id: userId });
    }
  }, []);

  // Fetch user chats from the backend
  useEffect(() => {
    if (user._id) {
      const getChats = async () => {
        try {
          const response = await fetch(`/api/chat/${user._id}`); // Mock API
          const data = await response.json();
          setChats(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    if (user._id) {
      socket.current = io("ws://localhost:5000");
      socket.current.emit("new-user-add", user._id);
      
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      
      socket.current.on("receive-message", (data) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.current.disconnect(); // Clean up on component unmount
      };
    }
  }, [user]);

  // Send message to the socket server
  const handleSendMessage = () => {
    if (socket.current && currentChat) {
      const messageData = {
        chatId: currentChat?._id,
        senderId: user._id,
        text: newMessage,
      };
      socket.current.emit("send-message", messageData);
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { senderId: user._id, text: newMessage },
      ]);
      setNewMessage(""); // Clear input after sending
    }
  };

  // Check if the chat member is online
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "white" }}>
      {/* Chat List Section */}
      <div style={{ width: "30%", borderRight: "1px solid gray", padding: "10px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" }}>Chats</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid gray",
              }}
            >
              Chat with: {chat.members.filter((member) => member !== user._id)}
              {checkOnlineStatus(chat) ? " (Online)" : " (Offline)"}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box Section */}
      <div style={{ flexGrow: 1, padding: "10px" }}>
        {currentChat ? (
          <>
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              Chatting with: {currentChat.members.filter((member) => member !== user._id)}
            </h3>
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                height: "300px",
                overflowY: "scroll",
                marginBottom: "20px",
                backgroundColor: "white",
              }}
            >
              {/* Render received messages */}
              {receivedMessages.map((msg, index) => (
                <div key={index} style={{ margin: "10px 0" }}>
                  <strong>{msg.senderId === user._id ? "You" : msg.senderId}:</strong> {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "4px",
                  backgroundColor: "white",
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: "10px",
                  marginLeft: "10px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <h3 style={{ color: "black", fontWeight: "bold" }}>
            Select a chat to start messaging
          </h3>
        )}
      </div>
    </div>
  );
};

export default Chat;
