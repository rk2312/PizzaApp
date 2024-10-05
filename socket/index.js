import { Server } from "socket.io"; // Importing socket.io
import http from 'http'; // Importing http module (if needed for server setup)

// Setting up the server
const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000", // CORS to allow requests from your frontend
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("new-user-add", (newUserId) => {
    // Check if the user is not already added
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // Send all active users to the newly connected user
    io.emit("get-users", activeUsers);
  });

  // On user disconnect
  socket.on("disconnect", () => {
    // Remove the user from active users list
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // Send the updated list of active users to all users
    io.emit("get-users", activeUsers);
  });

  // Send a message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to:", receiverId);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
